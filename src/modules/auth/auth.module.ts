import "dotenv/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthServices } from "./services/auth.service";
import { TokenAuthService } from "./services/token.service";
import { JwtStrategy } from "src/guards/strategy/jwt.strategy";
import { UserRepository } from "../user/repositories/user.repository";
import { AuthController } from "./controllers/auth.controller";
import { UserServices } from "../user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthServices,
    UserServices,
    TokenAuthService,
    JwtStrategy,
    { provide: "UserRepositoryInterface", useClass: UserRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
