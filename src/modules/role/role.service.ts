import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Role } from "./entities/role.entity";
import { PayloadRoleDto } from "./dto";
import { RoleRepositoryInterface } from "./repositories/role.interface";

@Injectable()
export class RoleServices {
  constructor(
    @Inject("RoleRepositoryInterface")
    private roleRepository: RoleRepositoryInterface,
  ) {}

  async getAllRole(): Promise<Role[]> {
    try {
      const role = await this.roleRepository.findAllRole();
      console.log(role);
      return role;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createRole(payload: PayloadRoleDto): Promise<Role> {
    try {
      return this.roleRepository.create(payload);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
