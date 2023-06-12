import { IsDecimal, IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateCrudDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName:String;

  @IsString()
  lastName:String;

  @IsEmail()
  email:String;
}