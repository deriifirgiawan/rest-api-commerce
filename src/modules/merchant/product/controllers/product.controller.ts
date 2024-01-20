import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Response, ResponseStatusCode } from "src/decorators";
import { ResponseService } from "src/response/response.service";
import { ProductService } from "../services/product.service";
import { PayloadAddProductDto } from "../dto/PayloadAddProduct.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("product")
export class ProductController {
  constructor(
    @Response() private responseService: ResponseService,
    private productService: ProductService,
  ) {}

  @ResponseStatusCode()
  @Get()
  async getProduct() {
    try {
      const result = await this.productService.getAllProduct();

      return this.responseService.success("Success Get All Product", result);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  @ResponseStatusCode()
  @Get(":id")
  async getProductById(@Param() id: string) {
    try {
      const result = await this.productService.getProductById(id);

      return this.responseService.success("Success Get Product", result);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  @ResponseStatusCode()
  @UseGuards(AuthGuard("jwt"))
  @Post("add")
  async addProduct(@Body() payload: PayloadAddProductDto) {
    try {
      const response = await this.productService.addProduct(payload);
      return this.responseService.success("Success Add Product", response);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }

  @ResponseStatusCode()
  @UseGuards(AuthGuard("jwt"))
  @Put("update/:id")
  async updateProduct(
    @Param() id: string,
    @Body() payload: PayloadAddProductDto,
  ) {
    try {
      const response = await this.productService.updateProductById(id, payload);
      return this.responseService.success("Success Add Product", response);
    } catch (error) {
      throw this.responseService.error(error);
    }
  }
}
