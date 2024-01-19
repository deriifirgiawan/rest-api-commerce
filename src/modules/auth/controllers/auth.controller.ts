import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  ServiceUnavailableException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthServices } from "../services/auth.service";
import { Response, ResponseStatusCode } from "src/decorators";
import { ResponseService } from "src/response/response.service";
import { PayloadLoginDto, PayloadRegisterDto } from "../dto";
import { UserServices } from "src/modules/user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    @Response() private responseService: ResponseService,
    private authService: AuthServices,
    private userService: UserServices,
  ) {}

  @ResponseStatusCode()
  @Post("login")
  async login(@Body() payload: PayloadLoginDto) {
    const user = await this.userService.getOneUserByEmail(payload.email);

    if (!user) {
      throw new NotFoundException(
        `Account with email ${payload?.email} not found`,
      );
    }

    const isMatch = await bcrypt.compare(user?.password, payload?.password);

    if (!isMatch) {
      throw new ForbiddenException("Password is incorrect");
    }

    try {
      const response = await this.authService.login(payload);
      return this.responseService.success("Login Success", response);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  @ResponseStatusCode()
  @Post("admin/register")
  async registerAdmin(@Body() payload: PayloadRegisterDto) {
    const user = await this.userService.getOneUserByEmail(payload.email);

    if (user) {
      throw new BadRequestException("Email already exist");
    }

    if (payload?.password !== payload?.confirm_password) {
      throw new BadRequestException(
        "password and confirmation_password is not same",
      );
    }

    try {
      const response = await this.authService.register({
        ...payload,
        role_id: 1,
      });

      return this.responseService.success("Success Registration", response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ResponseStatusCode()
  @Post("merchant/register")
  async registerMerchant(@Body() payload: PayloadRegisterDto) {
    const user = await this.userService.getOneUserByEmail(payload.email);

    if (user) {
      throw new BadRequestException("Email already exist");
    }

    if (payload?.password !== payload?.confirm_password) {
      throw new BadRequestException(
        "password and confirmation_password is not same",
      );
    }
    try {
      const response = await this.authService.register({
        ...payload,
        role_id: 2,
      });

      return this.responseService.success("Success Registration", response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ResponseStatusCode()
  @Post("customer/register")
  async registerCustomer(@Body() payload: PayloadRegisterDto) {
    const user = await this.userService.getOneUserByEmail(payload.email);

    if (user) {
      throw new BadRequestException("Email already exist");
    }

    if (payload?.password !== payload?.confirm_password) {
      throw new BadRequestException(
        "password and confirmation_password is not same",
      );
    }
    try {
      const response = await this.authService.register({
        ...payload,
        role_id: 3,
      });

      return this.responseService.success("Success Registration", response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
