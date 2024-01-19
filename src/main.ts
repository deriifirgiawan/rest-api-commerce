import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { initializeTransactionalContext } from "typeorm-transactional";
import { corsConfig } from "./configs";
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { rawBodyMiddleware } from "./middlewares";

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Enable Cors
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  app.use(rawBodyMiddleware());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: "Api-Version",
    defaultVersion: VERSION_NEUTRAL,
  });

  app.setGlobalPrefix("v1");
}
bootstrap();
