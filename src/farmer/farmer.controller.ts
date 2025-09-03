import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  // @Get()
  // findAll() {
  //   return this.farmerService.findAll();
  // }

  @Get(':farmerId')
  findOne(@Param('farmerId') farmerId: string) {
    return this.farmerService.getAFarmerById(farmerId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
  //   return this.farmerService.update(+id, updateFarmerDto);
  // }
}
