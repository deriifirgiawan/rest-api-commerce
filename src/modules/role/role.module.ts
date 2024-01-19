import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { RoleControllers } from "./role.controller";
import { RoleServices } from "./role.service";
import { RoleRepository } from "./repositories";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleControllers],
  providers: [
    RoleServices,
    {
      provide: "RoleRepositoryInterface",
      useClass: RoleRepository,
    },
  ],
  exports: [RoleServices],
})
export class RoleModule {}
