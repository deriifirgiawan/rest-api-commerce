import { Controller, Post } from "@nestjs/common";
import { SeedsService } from "./seeds.service";

@Controller({ path: "seeds" })
export class SeedsController {
  constructor(private seedService: SeedsService) {}

  @Post()
  create() {
    return this.seedService.run();
  }
}
