import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayloadCategoriesDto {
  @IsNumber()
  @IsNotEmpty()
  categoriesId: number[];
}

export class PayloadAddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  categoriesId: number[];
}
