import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserServices } from "./user.service";
import { UserRepository } from "./repositories/user.repository";
import { UserController } from "./user.controller";
import { JWTUtil } from "src/utils/jwt.util";
import { JwtService } from "@nestjs/jwt";
import { ResponseService } from "src/response/response.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserServices,
    JWTUtil,
    JwtService,
    ResponseService,
    {
      provide: "UserRepositoryInterface",
      useClass: UserRepository,
    },
  ],
  exports: [UserServices],
  controllers: [UserController],
})
export class UserModule {}
