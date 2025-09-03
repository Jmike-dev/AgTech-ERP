import {
  BadRequestException,
  Global,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Injectable()
export class ValidatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async validateAdminId(adminId: string) {
    if (!adminId) {
      throw new BadRequestException('Nurse ID must be provided');
    }
    try {
      const existingNurse = await this.prisma.admin.findUnique({
        where: {
          adminId: adminId,
        },
        select: {
          adminId: true,
        },
      });

      if (!existingNurse) {
        throw new NotFoundException('Nurse not found');
      }

      return existingNurse;
    } catch (error) {
      console.error('Error validating nurse ID:', error);
      throw error;
    }
  }
}
