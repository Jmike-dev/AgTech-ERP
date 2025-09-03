import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.createFarmer(createFarmerDto);
  }

  @Get(':farmerId')
  findOne(@Param('farmerId') farmerId: string) {
    return this.farmerService.getAFarmerById(farmerId);
  }
  @Get('/admin/:adminId')
  findAll(@Param('adminId') adminId: string) {
    return this.farmerService.AllFarmersByAdminId(adminId);
  }

  @Patch(':farmerId')
  update(
    @Param('farmerId') farmerId: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    return this.farmerService.updateFarmer(farmerId, updateFarmerDto);
  }
}
