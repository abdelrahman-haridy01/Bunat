import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill, SkillDocument } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private readonly skillModel: Model<SkillDocument>) {}

  findAll() {
    return this.skillModel.find().sort({ category: 1, name: 1 }).exec();
  }

  create(createSkillDto: CreateSkillDto) {
    return this.skillModel.create(createSkillDto);
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true }).exec();
  }
}

