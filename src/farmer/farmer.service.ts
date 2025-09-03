import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class FarmerService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly validateUser: ValidatorsService,
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
    });

    const { password, refreshToken, ...farmerWithoutPassword } = farmer;
    return farmerWithoutPassword;
  }

  findAll() {
    return `This action returns all farmer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmer`;
  }

  update(id: number, updateFarmerDto: UpdateFarmerDto) {
    return `This action updates a #${id} farmer`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmer`;
  }
}
