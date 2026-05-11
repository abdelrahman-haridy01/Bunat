import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LearningPath, LearningPathSchema } from './schemas/learning-path.schema';
import { LearningPathsController } from './learning-paths.controller';
import { LearningPathsService } from './learning-paths.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: LearningPath.name, schema: LearningPathSchema }])],
  controllers: [LearningPathsController],
  providers: [LearningPathsService],
  exports: [LearningPathsService, MongooseModule],
})
export class LearningPathsModule {}

