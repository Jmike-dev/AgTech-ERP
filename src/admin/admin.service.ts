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
    // private readonly validateUser: ValidatorsService,
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
    });

    const { password, refreshToken, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  async getAdminById(adminId: string) {
    // await this.validateUser.validateNurseId(adminId);
    const nurse = await this.prisma.admin.findUnique({
      where: { adminId: adminId },
    });

    const { password, refreshToken, ...nurseWithoutPassword } = nurse;
    return nurseWithoutPassword;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
