import { Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ValidatorsService } from 'src/helper/validators/validators.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CropsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validateUser: ValidatorsService,
  ) {}
  async create(createCropDto: CreateCropDto) {
    await this.validateUser.validateFarmerId(createCropDto.farmerId);
    return this.prisma.crops.create({
      data: createCropDto,
    });
  }

  async allCropsByFarmerId(farmerId: string) {
    await this.validateUser.validateFarmerId(farmerId);
    return await this.prisma.crops.findMany({
      where: {
        farmerId: farmerId,
      },
    });
  }

  async findOneCrop(cropId: string) {
    await this.validateUser.validateCropID(cropId);
    return await this.prisma.crops.findUnique({ where: { cropId: cropId } });
  }

  async updateCrop(cropId: string, updateCropDto: UpdateCropDto) {
    await this.validateUser.validateCropID(cropId);
    return await this.prisma.crops.update({
      where: { cropId: cropId },
      data: updateCropDto,
    });
  }
}
