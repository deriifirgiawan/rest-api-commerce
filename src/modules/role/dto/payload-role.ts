import { IsNotEmpty, IsString } from "class-validator";

export class PayloadRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
