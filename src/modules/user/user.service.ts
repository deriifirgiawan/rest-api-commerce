import { Inject, Injectable } from "@nestjs/common";
import { UserRepositoryInterface } from "./repositories/user.interface";
import { PayloadAddUser } from "./dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserServices {
  constructor(
    @Inject("UserRepositoryInterface")
    private userRepository: UserRepositoryInterface,
  ) {}

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneByCondition({ id });
  }

  async addUser(payload: PayloadAddUser): Promise<User> {
    const { firstname, lastname, email, password, role_id, confirm_password } =
      payload;

    const response = await this.userRepository.addUser({
      firstname,
      lastname,
      email,
      password,
      role_id,
      confirm_password,
    });

    return response;
  }

  async getOneUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    return user;
  }
}
