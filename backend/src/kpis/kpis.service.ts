import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { Kpi, KpiDocument } from './schemas/kpi.schema';

@Injectable()
export class KpisService {
  constructor(@InjectModel(Kpi.name) private readonly kpiModel: Model<KpiDocument>) {}

  findAll() {
    return this.kpiModel.find().populate('departmentId').sort({ name: 1 }).exec();
  }

  findById(id: string) {
    return this.kpiModel.findById(id).exec();
  }

  create(createKpiDto: CreateKpiDto) {
    return this.kpiModel.create({
      ...createKpiDto,
      departmentId: toObjectId(createKpiDto.departmentId) ?? null,
    });
  }

  update(id: string, updateKpiDto: UpdateKpiDto) {
    return this.kpiModel
      .findByIdAndUpdate(
        id,
        {
          ...updateKpiDto,
          departmentId:
            'departmentId' in updateKpiDto ? toObjectId(updateKpiDto.departmentId) ?? null : undefined,
        },
        { new: true },
      )
      .exec();
  }
}

