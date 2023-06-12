import { IsDecimal, IsEmail, IsNumber, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateCrudDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: String;

  @IsString()
  lastName: String;

  @IsEmail()
  email:String;
}