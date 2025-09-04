import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ValidatorsService } from 'src/helper/validators/validators.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validateUser: ValidatorsService,
  ) {}
  async createAdmin(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new BadRequestException('Email already exists');
    }

    const hashPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = await this.prisma.admin.create({
      data: { ...createAdminDto, password: hashPassword },
      select: {
        adminId: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return admin;
  }

  async getAdminById(adminId: string) {
    await this.validateUser.validateAdminId(adminId);
    const admin = await this.prisma.admin.findUnique({
      where: { adminId },
      select: {
        adminId: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return admin;
  }
}
