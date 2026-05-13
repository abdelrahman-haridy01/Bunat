import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { decryptSecret, encryptSecret } from 'src/common/utils/encryption.util';
import { toObjectId } from 'src/common/utils/object-id.util';
import { hashPassword } from 'src/common/utils/password.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAiSettingsDto } from './dto/update-ai-settings.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAiSettings, UserAiSettingsDocument } from './schemas/user-ai-settings.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserAiSettings.name)
    private readonly userAiSettingsModel: Model<UserAiSettingsDocument>,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.userModel
      .find()
      .populate('departmentId teamId managerId levelId')
      .sort({ fullName: 1 })
      .exec();

    return users.map((user) => this.toSafeUser(user));
  }

  async findById(id: string) {
    return this.userModel.findById(id).populate('departmentId teamId managerId levelId').exec();
  }

  async findProfile(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    return this.toSafeUser(user);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).select('+passwordHash').exec();
  }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await hashPassword(createUserDto.password);
    const createdUser = await this.userModel.create({
      ...createUserDto,
      passwordHash,
      departmentId: toObjectId(createUserDto.departmentId) ?? null,
      teamId: toObjectId(createUserDto.teamId) ?? null,
      managerId: toObjectId(createUserDto.managerId) ?? null,
    });

    return this.findProfile(createdUser.id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const payload: Record<string, unknown> = { ...updateUserDto };
    if (updateUserDto.password) {
      payload.passwordHash = await hashPassword(updateUserDto.password);
      delete payload.password;
    }

    if ('departmentId' in updateUserDto) {
      payload.departmentId = toObjectId(updateUserDto.departmentId) ?? null;
    }
    if ('teamId' in updateUserDto) {
      payload.teamId = toObjectId(updateUserDto.teamId) ?? null;
    }
    if ('managerId' in updateUserDto) {
      payload.managerId = toObjectId(updateUserDto.managerId) ?? null;
    }

    await this.userModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    return this.findProfile(id);
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return { success: true };
  }

  async updatePointsAndLevel(id: string, pointsTotal: number, levelId: string | null) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          pointsTotal,
          levelId: toObjectId(levelId) ?? null,
        },
        { new: true },
      )
      .exec();
  }

  async getAiSettings(userId: string) {
    const settings = await this.userAiSettingsModel.findOne({ userId: toObjectId(userId) }).exec();
    return this.toSafeAiSettings(settings);
  }

  async getResolvedAiSettings(userId: string) {
    const settings = await this.userAiSettingsModel.findOne({ userId: toObjectId(userId) }).exec();
    if (!settings) {
      return null;
    }

    const secret = this.getAiSettingsSecret();

    return {
      provider: settings.provider,
      apiKey: decryptSecret(settings.encryptedApiKey, secret),
      model: settings.model,
      baseUrl: settings.baseUrl,
      language: settings.language,
      defaultLessonCount: settings.defaultLessonCount,
      defaultFinalExamQuestionCount: settings.defaultFinalExamQuestionCount,
    };
  }

  async updateAiSettings(userId: string, updateAiSettingsDto: UpdateAiSettingsDto) {
    const existingSettings = await this.userAiSettingsModel.findOne({ userId: toObjectId(userId) }).exec();

    if (!existingSettings && !updateAiSettingsDto.apiKey) {
      throw new BadRequestException('أدخل مفتاح OpenAI API أولاً.');
    }

    const payload: Record<string, unknown> = {
      provider: 'openai',
    };

    if (updateAiSettingsDto.apiKey) {
      payload['encryptedApiKey'] = encryptSecret(updateAiSettingsDto.apiKey.trim(), this.getAiSettingsSecret());
    }
    if ('model' in updateAiSettingsDto && updateAiSettingsDto.model) {
      payload['model'] = updateAiSettingsDto.model.trim();
    }
    if ('baseUrl' in updateAiSettingsDto) {
      payload['baseUrl'] = updateAiSettingsDto.baseUrl?.trim() || null;
    }
    if ('language' in updateAiSettingsDto && updateAiSettingsDto.language) {
      payload['language'] = updateAiSettingsDto.language.trim();
    }
    if ('defaultLessonCount' in updateAiSettingsDto && updateAiSettingsDto.defaultLessonCount !== undefined) {
      payload['defaultLessonCount'] = Math.round(updateAiSettingsDto.defaultLessonCount);
    }
    if (
      'defaultFinalExamQuestionCount' in updateAiSettingsDto &&
      updateAiSettingsDto.defaultFinalExamQuestionCount !== undefined
    ) {
      payload['defaultFinalExamQuestionCount'] = Math.round(
        updateAiSettingsDto.defaultFinalExamQuestionCount,
      );
    }

    const nextSettings = await this.userAiSettingsModel
      .findOneAndUpdate(
        { userId: toObjectId(userId) },
        {
          $set: payload,
          $setOnInsert: {
            userId: toObjectId(userId),
            model: updateAiSettingsDto.model?.trim() || 'gpt-4o-mini',
            language: updateAiSettingsDto.language?.trim() || 'ar',
            defaultLessonCount: updateAiSettingsDto.defaultLessonCount ?? 5,
            defaultFinalExamQuestionCount: updateAiSettingsDto.defaultFinalExamQuestionCount ?? 5,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();

    return this.toSafeAiSettings(nextSettings);
  }

  async deleteAiSettingsApiKey(userId: string) {
    const settings = await this.userAiSettingsModel.findOne({ userId: toObjectId(userId) }).exec();
    if (!settings) {
      return { success: true };
    }

    await this.userAiSettingsModel.deleteOne({ _id: settings._id }).exec();
    return { success: true };
  }

  toSafeUser(user: UserDocument | (User & { _id?: unknown; id?: string })) {
    const normalizedUser: Record<string, unknown> =
      typeof (user as UserDocument).toObject === 'function'
        ? ((user as UserDocument).toObject() as unknown as Record<string, unknown>)
        : ({ ...user } as unknown as Record<string, unknown>);

    const { passwordHash, ...safeUser } = normalizedUser;
    return safeUser;
  }

  private toSafeAiSettings(settings: UserAiSettingsDocument | null) {
    if (!settings) {
      return {
        provider: 'openai',
        hasApiKey: false,
        maskedApiKey: null,
        model: 'gpt-4o-mini',
        baseUrl: null,
        language: 'ar',
        defaultLessonCount: 5,
        defaultFinalExamQuestionCount: 5,
      };
    }

    const decryptedApiKey = decryptSecret(settings.encryptedApiKey, this.getAiSettingsSecret());
    const visibleSuffix = decryptedApiKey ? `••••${decryptedApiKey.slice(-4)}` : null;

    return {
      provider: settings.provider,
      hasApiKey: !!decryptedApiKey,
      maskedApiKey: visibleSuffix,
      model: settings.model,
      baseUrl: settings.baseUrl,
      language: settings.language,
      defaultLessonCount: settings.defaultLessonCount,
      defaultFinalExamQuestionCount: settings.defaultFinalExamQuestionCount,
    };
  }

  private getAiSettingsSecret() {
    return (
      this.configService.get<string>('AI_SETTINGS_ENCRYPTION_KEY') ||
      this.configService.get<string>('JWT_SECRET') ||
      'change-me'
    );
  }
}
