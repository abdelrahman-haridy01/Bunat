import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>) {}

  findAll() {
    return this.teamModel.find().populate('departmentId managerId members').sort({ name: 1 }).exec();
  }

  create(createTeamDto: CreateTeamDto) {
    return this.teamModel.create({
      ...createTeamDto,
      departmentId: toObjectId(createTeamDto.departmentId),
      managerId: toObjectId(createTeamDto.managerId) ?? null,
      members: createTeamDto.members?.map((memberId) => toObjectId(memberId)) ?? [],
    });
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamModel
      .findByIdAndUpdate(
        id,
        {
          ...updateTeamDto,
          departmentId:
            'departmentId' in updateTeamDto ? toObjectId(updateTeamDto.departmentId) : undefined,
          managerId:
            'managerId' in updateTeamDto ? toObjectId(updateTeamDto.managerId) ?? null : undefined,
          members:
            'members' in updateTeamDto
              ? updateTeamDto.members?.map((memberId) => toObjectId(memberId)) ?? []
              : undefined,
        },
        { new: true },
      )
      .exec();
  }
}

