import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "./configs";
import { RoleModule } from "./modules/role/role.module";
import { ResponseModule } from "./response/response.module";
import { SeedsModule } from "./seeds/seeds.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { LoggerMiddleware } from "./middlewares";
import { APP_PIPE } from "@nestjs/core";
import { ProductModule } from "./modules/merchant/product/modules";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    // Import Another Modules here
    RoleModule,
    ResponseModule,
    SeedsModule,
    UserModule,
    AuthModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
