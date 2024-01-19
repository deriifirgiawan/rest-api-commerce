import { Module } from "@nestjs/common";
import { RoleModule } from "src/modules/role/role.module";
import { SeedsController } from "./seeds.controller";
import { SeedsService } from "./seeds.service";

@Module({
  imports: [RoleModule],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
