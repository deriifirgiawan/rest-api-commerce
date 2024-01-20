import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/repositories/base";
import { Categories } from "../entities/categories.entity";
import { CategoryRepositoryInterface } from "./interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository
  extends BaseAbstractRepository<Categories>
  implements CategoryRepositoryInterface
{
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {
    super(categoryRepository);
  }
  findOneById(id: number): Promise<Categories> {
    return this.categoryRepository.findOne({ where: { id } });
  }
}
