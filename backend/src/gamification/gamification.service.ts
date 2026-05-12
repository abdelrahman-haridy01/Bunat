import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BadgeCriteriaType, PointsSourceType } from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { UsersService } from 'src/users/users.service';
import { AwardPointsDto } from './dto/award-points.dto';
import { Badge, BadgeDocument } from './schemas/badge.schema';
import { Level, LevelDocument } from './schemas/level.schema';
import { PointsTransaction, PointsTransactionDocument } from './schemas/points-transaction.schema';
import { UserBadge, UserBadgeDocument } from './schemas/user-badge.schema';

@Injectable()
export class GamificationService {
  constructor(
    @InjectModel(PointsTransaction.name)
    private readonly pointsTransactionModel: Model<PointsTransactionDocument>,
    @InjectModel(Level.name)
    private readonly levelModel: Model<LevelDocument>,
    @InjectModel(Badge.name)
    private readonly badgeModel: Model<BadgeDocument>,
    @InjectModel(UserBadge.name)
    private readonly userBadgeModel: Model<UserBadgeDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getMySummary(userId: string) {
    const [user, level, badges, transactions] = await Promise.all([
      this.usersService.findById(userId),
      this.levelModel.findOne({ minPoints: { $lte: 0 } }).exec(),
      this.userBadgeModel.find({ userId }).populate('badgeId').sort({ awardedAt: -1 }).exec(),
      this.pointsTransactionModel.find({ userId }).sort({ createdAt: -1 }).limit(20).exec(),
    ]);

    return {
      user: user ? this.usersService.toSafeUser(user) : null,
      currentLevel: user?.levelId ?? level,
      badges,
      recentTransactions: transactions,
    };
  }

  async getLeaderboard() {
    const users = await this.usersService.findAll();
    return users.sort((a, b) => Number(b.pointsTotal) - Number(a.pointsTotal)).slice(0, 10);
  }

  async awardPoints(dto: AwardPointsDto) {
    return this.awardPointsInternal(dto.userId, dto.sourceType, dto.sourceId, dto.points, dto.description);
  }

  async awardPointsInternal(
    userId: string,
    sourceType: PointsSourceType,
    sourceId: string,
    points: number,
    description: string,
  ) {
    const duplicate = await this.pointsTransactionModel.findOne({ userId, sourceType, sourceId }).exec();
    if (duplicate) {
      return duplicate;
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const nextPointsTotal = user.pointsTotal + points;
    const nextLevel = await this.levelModel
      .findOne({ minPoints: { $lte: nextPointsTotal }, maxPoints: { $gte: nextPointsTotal } })
      .exec();

    const transaction = await this.pointsTransactionModel.create({
      userId: toObjectId(userId),
      sourceType,
      sourceId,
      points,
      description,
    });

    await this.usersService.updatePointsAndLevel(userId, nextPointsTotal, nextLevel?.id ?? null);
    await this.evaluatePointsBadges(userId, nextPointsTotal);

    return transaction;
  }

  private async evaluatePointsBadges(userId: string, pointsTotal: number) {
    const badges = await this.badgeModel.find({ criteriaType: BadgeCriteriaType.Points }).exec();
    const normalizedUserId = toObjectId(userId);

    for (const badge of badges) {
      if (pointsTotal < badge.criteriaValue) {
        continue;
      }

      const badgeId = toObjectId(badge.id);
      const awardResult = await this.userBadgeModel.updateOne(
        {
          userId: normalizedUserId,
          badgeId,
        },
        {
          $setOnInsert: {
            userId: normalizedUserId,
            badgeId,
            awardedAt: new Date(),
            awardedBy: null,
          },
        },
        { upsert: true },
      );

      if (!awardResult.upsertedCount) {
        continue;
      }

      if (badge.pointsReward > 0) {
        await this.awardPointsInternal(
          userId,
          PointsSourceType.BadgeAwarded,
          badge.id,
          badge.pointsReward,
          `مكافأة شارة: ${badge.name}`,
        );
      }
    }
  }
}
