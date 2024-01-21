import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "../repositories/interface";
import { PayloadAddProductDto } from "../dto/PayloadAddProduct.dto";
import { Product } from "../entities";

@Injectable()
export class ProductService {
  constructor(
    @Inject("ProductRepositoryInterface")
    private productRepository: ProductRepositoryInterface,
  ) {}

  async addProduct(payload: PayloadAddProductDto) {
    const { name, price, quantity, user_id, description } = payload;

    try {
      const product = this.productRepository.create({
        name,
        price,
        quantity,
        user_id,
        description,
      });
      return this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addCategoriesProduct(payload: number[], product: Product) {
    payload.forEach(async (value) => {
      return await this.productRepository
        .createQueryBuilder("p")
        .insert()
        .into("products_categories")
        .values({
          products_id: product?.id,
          categories_id: value,
        })
        .execute();
    });

    return product;
  }

  async getAllProduct() {
    return await this.productRepository
      .createQueryBuilder("p")
      .select([
        "p.id as id",
        "p.name as name",
        "p.price as price",
        "p.description as description",
        "p.quantity as quantity",
        "p.created_at as created_at",
        "p.updated_at as updated_at",
        "jsonb_agg(jsonb_build_object('id', c.id, 'name', c.category_name)) as category",
      ])
      .leftJoin("products_categories", "pc", "p.id = pc.products_id")
      .leftJoin("categories", "c", "pc.categories_id = c.id")
      .groupBy("p.id, p.name, p.description, p.quantity, p.price")
      .getRawMany();
  }

  async getProductById(id: string) {
    return await this.productRepository
      .createQueryBuilder("p")
      .select([
        "p.id as id",
        "p.name as name",
        "p.price as price",
        "p.description as description",
        "p.quantity as quantity",
        "p.created_at as created_at",
        "p.updated_at as updated_at",
        "jsonb_agg(jsonb_build_object('id', c.id, 'name', c.category_name)) as category",
      ])
      .leftJoin("products_categories", "pc", "p.id = pc.products_id")
      .leftJoin("categories", "c", "pc.categories_id = c.id")
      .where(`p.id = :id`, { id: id })
      .groupBy("p.id, p.name, p.description, p.quantity, p.price")
      .getRawMany();
  }

  async updateProductById(id: string, payload: PayloadAddProductDto) {
    const { name, price, quantity, description } = payload;
    return this.productRepository.update(id, {
      name,
      price,
      quantity,
      description,
    });
  }

  async deleteAndInsertCategory(id: string, categories: number[]) {
    for (let i = 0; i < categories.length; i++) {
      await this.productRepository
        .createQueryBuilder("p")
        .select("*")
        .from("products", "p")
        .leftJoin("products_categories", "pc", "p.id = pc.products_id")
        .delete()
        .from("products_categories")
        .where("products_id = :products_id", { products_id: id })
        .execute();
    }

    for (let i = 0; i < categories.length; i++) {
      await this.productRepository
        .createQueryBuilder()
        .select("*")
        .from("products", "p")
        .leftJoin("products_categories", "pc", "p.id = pc.products_id")
        .insert()
        .into("products_categories")
        .values({ products_id: id, categories_id: categories[i] })
        .execute();
    }
  }
}
