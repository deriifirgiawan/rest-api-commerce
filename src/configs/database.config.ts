import "dotenv/config";
import { DataSourceOptions } from "typeorm";

export const DatabaseConfig: DataSourceOptions = {
  type: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  synchronize: true,
  logging: true,
  migrationsRun: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
};
