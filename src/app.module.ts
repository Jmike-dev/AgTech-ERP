import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { FarmerModule } from './farmer/farmer.module';
import { CropsModule } from './crops/crops.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, FarmerModule, CropsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
