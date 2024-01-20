import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "../entities/categories.entity";
import { CategoryServices } from "../services";
import { CategoryRepository } from "../repositories/category.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  exports: [CategoryServices],
  providers: [
    CategoryServices,
    {
      provide: "CategoryRepositoryInterface",
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
