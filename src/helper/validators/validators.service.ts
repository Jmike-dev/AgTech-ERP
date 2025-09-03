import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async validateAdminId(adminId: string) {
    if (!adminId) {
      throw new BadRequestException('admin ID must be provided');
    }
    try {
      const existingAdmin = await this.prisma.admin.findUnique({
        where: {
          adminId: adminId,
        },
        select: {
          adminId: true,
        },
      });

      if (!existingAdmin) {
        throw new NotFoundException('admin not found');
      }

      return existingAdmin;
    } catch (error) {
      console.error('Error validating nurse ID:', error);
      throw error;
    }
  }
  async validateFarmerId(farmerId: string) {
    if (!farmerId) {
      throw new BadRequestException('farmer ID must be provided');
    }
    try {
      const existingAdmin = await this.prisma.farmers.findUnique({
        where: {
          farmerId: farmerId,
        },
        select: {
          farmerId: true,
        },
      });

      if (!existingAdmin) {
        throw new NotFoundException('farmer not found');
      }

      return existingAdmin;
    } catch (error) {
      console.error('Error validating farmer ID:', error);
      throw error;
    }
  }

  async validateCropID(cropId: string) {
    if (!cropId) {
      throw new BadRequestException('crop ID must be provided');
    }
    try {
      const existingCrop = await this.prisma.crops.findUnique({
        where: {
          cropId: cropId,
        },
        select: {
          cropId: true,
        },
      });

      if (!existingCrop) {
        throw new NotFoundException('crop not found');
      }

      return existingCrop;
    } catch (error) {
      console.error('Error validating crop ID:', error);
      throw error;
    }
  }
}
