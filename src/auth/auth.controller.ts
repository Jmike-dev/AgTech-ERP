import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.validateAdmin(loginDto.email, loginDto.password);
  }
  @Post('login/farmers')
  async loginfarmer(@Body() loginDto: { email: string; password: string }) {
    return this.authService.validateFarmer(loginDto.email, loginDto.password);
  }
}
