import { BaseInterfaceRepository } from "src/repositories/base";
import { Categories } from "../../entities";

export interface CategoryRepositoryInterface
  extends BaseInterfaceRepository<Categories> {
  findOneById(id: number): Promise<Categories>;
}
