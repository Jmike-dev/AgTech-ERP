import { Module } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';
import { ValidatorsService } from 'src/helper/validators/validators.service';

@Module({
  controllers: [CropsController],
  providers: [CropsService, ValidatorsService],
})
export class CropsModule {}
