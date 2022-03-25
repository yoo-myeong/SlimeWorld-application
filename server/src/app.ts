import "reflect-metadata";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import Container from "typedi";
import session from "express-session";
import express, { Express } from "express";
import { Server } from "http";
import { createExpressServer, useContainer } from "routing-controllers";
import { sessionOption } from "./middleware/session";
import { config } from "./config/config";
import { logger, loggerStream } from "./config/winston";
import { connectDatabase } from "./config/database";
import { UserController } from "./controller/auth.controller";

export class App {
  public app: Express;

  constructor() {
    useContainer(Container);
    this.app = createExpressServer({
      controllers: [UserController],
    });
    this.setDatabase();
    this.setMiddleware();
  }

  public startServer(port: number): Server {
    const server = this.app.listen(port, () => {
      logger.info(`server started on ${port}`);
    });
    return server;
  }

  public stopServer(server: Server): void {
    server.close();
  }

  private async setDatabase() {
    try {
      await connectDatabase();
    } catch (e) {
      logger.error(e);
    }
  }

  private setMiddleware() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("short", { stream: new loggerStream() }));
    this.app.use(session(sessionOption));
    this.app.use(
      cors({
        origin: config.cors.allowedOrigin,
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );
  }
}
