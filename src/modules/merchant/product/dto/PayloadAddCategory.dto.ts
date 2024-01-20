import { IsString } from "class-validator";

export class PayloadAddCategoryDto {
  @IsString()
  category_name: string;
}
