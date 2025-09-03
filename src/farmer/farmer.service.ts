import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ValidatorsService } from 'src/helper/validators/validators.service';

@Injectable()
export class FarmerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validateUser: ValidatorsService,
  ) {}
  async createFarmer(createFarmerDto: CreateFarmerDto) {
    const existingFarmer = await this.prisma.farmers.findUnique({
      where: { email: createFarmerDto.email },
    });

    if (existingFarmer) {
      throw new BadRequestException('Email already exists');
    }

    const hashPassword = await bcrypt.hash(createFarmerDto.password, 10);
    const farmer = await this.prisma.farmers.create({
      data: { ...createFarmerDto, password: hashPassword },
      select: {
        farmerId: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return farmer;
  }

  async getAFarmerById(farmerId: string) {
    await this.validateUser.validateFarmerId(farmerId);
    const farmer = await this.prisma.farmers.findUnique({
      where: { farmerId: farmerId },
    });

    const { password, refreshToken, ...nurseWithoutPassword } = farmer;
    return nurseWithoutPassword;
  }
  async AllFarmersByAdminId(adminId: string) {
    await this.validateUser.validateAdminId(adminId);

    return this.prisma.farmers.findMany({
      where: {
        adminId: adminId,
      },
      select: {
        farmerId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        adminId: true,
      },
    });
  }

  async updateFarmer(farmerId: string, updateFarmerDto: UpdateFarmerDto) {
    await this.validateUser.validateFarmerId(farmerId);

    return await this.prisma.farmers.update({
      where: { farmerId: farmerId },
      data: updateFarmerDto,
      select: {
        farmerId: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        adminId: true,
      },
    });
  }
}
