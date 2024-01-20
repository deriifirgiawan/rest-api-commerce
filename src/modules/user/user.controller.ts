import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { UserServices } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { JWTUtil } from "src/utils/jwt.util";
import { Response } from "src/decorators";
import { ResponseService } from "src/response/response.service";

@Controller({ path: "user" })
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(
    @Response() private responseService: ResponseService,
    private userService: UserServices,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Get()
  async getUser(@Headers("Authorization") auth: string) {
    const jwtUuid = this.jwtUtil.decode(auth);
    const user = await this.userService.getUserById(jwtUuid?.id);

    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    const {
      id,
      firstname,
      lastname,
      email,
      role_id,
      created_at,
      updated_at,
      deleted_at,
    } = user;
    return this.responseService.success("Success get User Data", {
      id,
      firstname,
      lastname,
      email,
      role_id,
      created_at,
      updated_at,
      deleted_at,
    });
  }
}
