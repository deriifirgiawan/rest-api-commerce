import { Controller } from "@nestjs/common";
import { UserServices } from "./user.service";

@Controller({ path: "user" })
export class UserController {
  constructor(private userService: UserServices) {}
}
