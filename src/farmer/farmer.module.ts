import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { ValidatorsService } from 'src/helper/validators/validators.service';

@Module({
  controllers: [FarmerController],
  providers: [FarmerService, ValidatorsService],
})
export class FarmerModule {}
