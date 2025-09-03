import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post('')
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get('farmer/:farmerId')
  findAll(@Param('farmerId') farmerId: string) {
    return this.cropsService.allCropsByFarmerId(farmerId);
  }
  @Get(':cropId')
  findOne(@Param('cropId') cropId: string) {
    return this.cropsService.findOneCrop(cropId);
  }

  @Patch(':cropId')
  update(
    @Param('cropId') cropId: string,
    @Body() updateCropDto: UpdateCropDto,
  ) {
    return this.cropsService.updateCrop(cropId, updateCropDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cropsService.remove(+id);
  // }
}
