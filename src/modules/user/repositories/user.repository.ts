import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "src/repositories/base";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PayloadAddUser } from "../dto";

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async addUser(payload: PayloadAddUser): Promise<User> {
    const { firstname, lastname, email, password, role_id } = payload;

    const response = this.userRepository.create({
      firstname,
      lastname,
      email,
      password,
      role_id,
    });

    return response;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }
}
