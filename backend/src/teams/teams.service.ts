import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findAll() {
    return this.teamModel.find().populate('departmentId managerId members').sort({ name: 1 }).exec();
  }

  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = await this.teamModel.create({
      ...createTeamDto,
      departmentId: toObjectId(createTeamDto.departmentId),
      managerId: toObjectId(createTeamDto.managerId) ?? null,
      members: createTeamDto.members?.map((memberId) => toObjectId(memberId)) ?? [],
    });

    await this.syncTeamUsers(createdTeam.id);
    return this.teamModel.findById(createdTeam.id).populate('departmentId managerId members').exec();
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    await this.teamModel
      .findByIdAndUpdate(id, {
        ...updateTeamDto,
        departmentId: 'departmentId' in updateTeamDto ? toObjectId(updateTeamDto.departmentId) : undefined,
        managerId: 'managerId' in updateTeamDto ? toObjectId(updateTeamDto.managerId) ?? null : undefined,
        members:
          'members' in updateTeamDto ? updateTeamDto.members?.map((memberId) => toObjectId(memberId)) ?? [] : undefined,
      })
      .exec();

    await this.syncTeamUsers(id);
    return this.teamModel.findById(id).populate('departmentId managerId members').exec();
  }

  async remove(id: string) {
    await this.clearTeamUsers(id);
    await this.teamModel.findByIdAndDelete(id).exec();
    return { success: true };
  }

  private async syncTeamUsers(teamId: string) {
    const team = await this.teamModel.findById(teamId).exec();
    if (!team) {
      return;
    }

    await this.clearTeamUsers(teamId);

    const memberIds = (team.members ?? []).map((memberId) => toObjectId(String(memberId))).filter(Boolean);
    if (!memberIds.length) {
      return;
    }

    await this.userModel
      .updateMany(
        { _id: { $in: memberIds } },
        {
          $set: {
            teamId: team._id,
            managerId: team.managerId ?? null,
          },
        },
      )
      .exec();
  }

  private async clearTeamUsers(teamId: string) {
    await this.userModel
      .updateMany(
        { teamId: toObjectId(teamId) },
        {
          $set: {
            teamId: null,
            managerId: null,
          },
        },
      )
      .exec();
  }
}
