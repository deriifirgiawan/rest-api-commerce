import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "../entities";
import { PayloadAddProductDto } from "../dto/PayloadAddProduct.dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async updateProduct(id: string, payload: PayloadAddProductDto): Promise<any> {
    await this.update(id, payload);
    return payload?.categoriesId.forEach((value) => {
      this.query(
        `delete products_categories_categories pcc WHERE pcc.productsId::text = ${id} insert into products_categories_categories ("productsId", "categoriesId") values ('${id}', ${value})`,
      );
    });
  }

  addProduct(payload: PayloadAddProductDto): Promise<any> {
    const product = this.create(payload);
    payload?.categoriesId.forEach((value) => {
      this.query(
        `insert into products_categories_categories ("productsId", "categoriesId") values ('${product?.id}', ${value})`,
      );
    });
    return this.save(product);
  }

  deleteById(id: string) {
    return this.delete(id);
  }

  findOneById(id: string): Promise<Product> {
    return this.query(
      `select p."id" as id, p."name" as name ,p.price as price, p.description, p.quantity, p.created_at, p.updated_at as description, jsonb_agg(jsonb_build_object('id', c.id, 'name', c.category_name)) as category from products p left join products_categories_categories pcc on p.id = pcc."productsId" left join categories c on pcc."categoriesId" = c.id where p.id::text = ${id} group by p.id, p.name, p.description ,p.quantity ,p.price`,
    );
  }

  findAll(): Promise<Product[]> {
    return this.query(
      `select p."id" as id, p."name" as name ,p.price as price, p.description, p.quantity, p.created_at, p.updated_at as description, jsonb_agg(jsonb_build_object('id', c.id, 'name', c.category_name)) as category from products p left join products_categories_categories pcc on p.id = pcc."productsId" left join categories c on pcc."categoriesId" = c.id group by p.id, p.name, p.description ,p.quantity ,p.price `,
    );
  }
}
