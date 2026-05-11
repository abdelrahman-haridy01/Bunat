import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, DepartmentDocument } from './schemas/department.schema';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  findAll() {
    return this.departmentModel.find().populate('managerId').sort({ name: 1 }).exec();
  }

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create({
      ...createDepartmentDto,
      managerId: toObjectId(createDepartmentDto.managerId) ?? null,
    });
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel
      .findByIdAndUpdate(
        id,
        {
          ...updateDepartmentDto,
          managerId:
            'managerId' in updateDepartmentDto
              ? toObjectId(updateDepartmentDto.managerId) ?? null
              : undefined,
        },
        { new: true },
      )
      .exec();
  }
}

