import { Module } from "@nestjs/common";
import { RoleModule } from "src/modules/role/role.module";
import { SeedsController } from "./seeds.controller";
import { SeedsService } from "./seeds.service";
import { CategoryModule } from "src/modules/merchant/product/modules";

@Module({
  imports: [RoleModule, CategoryModule],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
