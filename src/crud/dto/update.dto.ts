import { IsDecimal, IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateCrudDto {

  @IsString()
  firstName:String;

  @IsString()
  lastName:String;

  @IsEmail()
  email:String;
  
  @IsString()
  password:String;
}