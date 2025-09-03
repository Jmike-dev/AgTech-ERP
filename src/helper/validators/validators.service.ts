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
}
