import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { Badge, BadgeSchema } from './schemas/badge.schema';
import { Level, LevelSchema } from './schemas/level.schema';
import { PointsTransaction, PointsTransactionSchema } from './schemas/points-transaction.schema';
import { UserBadge, UserBadgeSchema } from './schemas/user-badge.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: PointsTransaction.name, schema: PointsTransactionSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Badge.name, schema: BadgeSchema },
      { name: UserBadge.name, schema: UserBadgeSchema },
    ]),
  ],
  controllers: [GamificationController],
  providers: [GamificationService],
  exports: [GamificationService, MongooseModule],
})
export class GamificationModule {}

