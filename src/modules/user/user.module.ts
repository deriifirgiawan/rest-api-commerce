import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserServices } from "./user.service";
import { UserRepository } from "./repositories/user.repository";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserServices,
    {
      provide: "UserRepositoryInterface",
      useClass: UserRepository,
    },
  ],
  exports: [UserServices],
  controllers: [UserController],
})
export class UserModule {}
