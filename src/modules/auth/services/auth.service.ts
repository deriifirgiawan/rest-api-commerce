import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepositoryInterface } from "src/modules/user/repositories/user.interface";
import { TokenAuthService } from "./token.service";
import { PayloadAddUser } from "src/modules/user/dto";
import { PayloadLoginDto } from "../dto";

@Injectable()
export class AuthServices {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
    private tokenService: TokenAuthService,
  ) {}

  async login(payload: PayloadLoginDto): Promise<{ token: string }> {
    const { email } = payload;
    const user = await this.userRepository.findOneByEmail(email);
    const token = await this.tokenService.signToken(user?.id, user.role_id);

    return { token };
  }

  async register(payload: PayloadAddUser): Promise<{ token: string }> {
    const { firstname, lastname, email, password, confirm_password, role_id } =
      payload;

    // generate salt
    const salt = await bcrypt.genSalt();

    // generate hash password
    const hash = await bcrypt.hash(password, salt);

    const request = await this.userRepository.create({
      firstname,
      lastname,
      email,
      password: hash,
      confirm_password: confirm_password,
      role_id: role_id,
    });

    const token = await this.tokenService.signToken(
      request?.id,
      request?.role_id,
    );
    return { token };
  }
}
