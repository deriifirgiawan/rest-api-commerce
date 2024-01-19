import { Injectable } from "@nestjs/common";
import { RoleServices } from "src/modules/role/role.service";
import { roles } from "./data";

@Injectable()
export class SeedsService {
  constructor(private roleService: RoleServices) {}

  async run() {
    try {
      for (let i = 0; i < roles.length; i++) {
        this.roleService.createRole(roles[i]);
      }
    } catch (error) {
      throw error;
    }
  }
}
