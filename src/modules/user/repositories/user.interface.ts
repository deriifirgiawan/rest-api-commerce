import { BaseInterfaceRepository } from "src/repositories/base";
import { User } from "../entities/user.entity";
import { PayloadAddUser } from "../dto";

export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {
  addUser(payload: PayloadAddUser): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
}
