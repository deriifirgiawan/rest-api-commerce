import { Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "../repositories/interface";
import { PayloadAddProductDto } from "../dto/PayloadAddProduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @Inject("ProductRepositoryInterface")
    private productRepository: ProductRepositoryInterface,
  ) {}

  async addProduct(payload: PayloadAddProductDto) {
    return this.productRepository.addProduct(payload);
  }

  async getAllProduct() {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string) {
    return await this.productRepository.findOneById(id);
  }

  async updateProductById(id: string, payload: PayloadAddProductDto) {
    return await this.productRepository.updateProduct(id, payload);
  }
}
