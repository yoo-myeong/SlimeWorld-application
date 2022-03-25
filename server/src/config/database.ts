import "reflect-metadata";
import Container from "typedi";
import { ConnectionOptions, createConnection, useContainer } from "typeorm";
import { config } from "./config";

export async function connectDatabase(): Promise<void> {
  const databaseOption: ConnectionOptions = {
    type: "mysql",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: config.nodeEnv === "DEV" ? ["query"] : false,
    entities: ["dist/entity/**/*.{js,ts}"],
    migrations: ["dist/migration/**/*.{js,ts}"],
    subscribers: ["dist/subscriber/**/*.{js,ts}"],
  };
  useContainer(Container);
  createConnection(databaseOption);
}
