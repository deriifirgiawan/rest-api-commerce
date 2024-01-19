import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/repositories/base";
import { Role } from "../entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PayloadRoleDto } from "../dto";
import { RoleRepositoryInterface } from "./role.interface";

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<Role>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
  createRole(payload: PayloadRoleDto): Promise<Role> {
    return this.create(payload);
  }

  findAllRole(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
