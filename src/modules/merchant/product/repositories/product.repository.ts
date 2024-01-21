import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "../entities";
import { PayloadAddProductDto } from "../dto/PayloadAddProduct.dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  addProduct(payload: PayloadAddProductDto): Promise<any> {
    const product = this.create(payload);

    if (product.id) {
      payload?.categoriesId.forEach(async (value) => {
        await this.query(
          `insert into products_categories ("products_id", "categories_id") values ('${product?.id}', ${value})`,
        );
      });
    }
    return this.save(product);
  }
}
