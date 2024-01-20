import { Inject, Injectable } from "@nestjs/common";
import { CategoryRepositoryInterface } from "../repositories/interface";
import { PayloadAddCategoryDto } from "../dto";

@Injectable()
export class CategoryServices {
  constructor(
    @Inject("CategoryRepositoryInterface")
    private categoryRepository: CategoryRepositoryInterface,
  ) {}

  addCategories(payload: PayloadAddCategoryDto) {
    return this.categoryRepository.create(payload);
  }
}
