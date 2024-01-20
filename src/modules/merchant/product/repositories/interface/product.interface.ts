import { Product } from "../../entities";
import { PayloadAddProductDto } from "../../dto/PayloadAddProduct.dto";
import { Repository } from "typeorm";

export interface ProductRepositoryInterface extends Repository<Product> {
  findAll(): Promise<Product[]>;
  findOneById(id: string): Promise<Product>;
  deleteById(id: string);
  addProduct(payload: PayloadAddProductDto): Promise<any>;
  updateProduct(id: string, payload: PayloadAddProductDto): Promise<any>;
}
