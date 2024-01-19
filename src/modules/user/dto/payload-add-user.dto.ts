import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayloadAddUser {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
