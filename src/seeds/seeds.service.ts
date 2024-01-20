import { Injectable } from "@nestjs/common";
import { RoleServices } from "src/modules/role/role.service";
import { roles, categories } from "./data";
import { CategoryServices } from "src/modules/merchant/product/services";

@Injectable()
export class SeedsService {
  constructor(
    private roleService: RoleServices,
    private categoryService: CategoryServices,
  ) {}

  async run() {
    try {
      for (let i = 0; i < roles.length; i++) {
        this.roleService.createRole(roles[i]);
      }

      for (let i = 0; i < categories.length; i++) {
        this.categoryService.addCategories(categories[i]);
      }
    } catch (error) {
      throw error;
    }
  }
}
