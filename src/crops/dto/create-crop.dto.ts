import { IsNotEmpty, IsString, IsInt } from 'class-validator';
export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  number: number;

  @IsString()
  @IsNotEmpty()
  farmerId: string;
}
