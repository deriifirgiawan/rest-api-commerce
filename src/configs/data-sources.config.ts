import { DataSource } from "typeorm";
import { DatabaseConfig } from "./database.config";

export const AppDataSource = new DataSource(DatabaseConfig);
