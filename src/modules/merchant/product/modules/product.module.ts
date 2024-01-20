import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities";
import { ProductService } from "../services/product.service";
import { ProductRepository } from "../repositories/product.repository";
import { ProductController } from "../controllers/product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductService,
    {
      provide: "ProductRepositoryInterface",
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
