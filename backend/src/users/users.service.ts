import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { hashPassword } from 'src/common/utils/password.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

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

  toSafeUser(user: UserDocument | (User & { _id?: unknown; id?: string })) {
    const normalizedUser: Record<string, unknown> =
      typeof (user as UserDocument).toObject === 'function'
        ? ((user as UserDocument).toObject() as unknown as Record<string, unknown>)
        : ({ ...user } as unknown as Record<string, unknown>);

    const { passwordHash, ...safeUser } = normalizedUser;
    return safeUser;
  }
}
