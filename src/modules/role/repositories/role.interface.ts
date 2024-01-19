import { BaseInterfaceRepository } from "src/repositories/base";
import { Role } from "../entities/role.entity";

export interface RoleRepositoryInterface extends BaseInterfaceRepository<Role> {
  findAllRole(): Promise<Role[]>;
}
