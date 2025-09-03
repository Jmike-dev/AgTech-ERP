import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ValidatorsService } from 'src/helper/validators/validators.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, ValidatorsService],
})
export class AdminModule {}
