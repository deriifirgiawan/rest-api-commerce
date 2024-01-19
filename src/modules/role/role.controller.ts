import { Controller, Get } from "@nestjs/common";
import { Response, ResponseStatusCode } from "src/decorators";
import { ResponseService } from "src/response/response.service";
import { RoleServices } from "./role.service";

@Controller({ path: "user-role" })
export class RoleControllers {
  constructor(
    @Response() private responseService: ResponseService,
    private readonly roleService: RoleServices,
  ) {}

  @ResponseStatusCode()
  @Get()
  async findAll() {
    try {
      const roles = await this.roleService.getAllRole();
      console.log(roles);

      return this.responseService.success("Success get all data", roles);
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
