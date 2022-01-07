import mysql2 from "mysql2/promise";
import "reflect-metadata";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import * as Session from "express-session";
import session from "express-session";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import authRoutes from "./routes/auth.routes.js";
import expressMySqlSession from "express-mysql2-session";
import { config } from "./config.js";

declare module "express-session" {
  export interface SessionData {
    is_logined: boolean;
    greeting: string;
  }
}

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

const connection = mysql2.createPool(config.db);

const MySQLStore = expressMySqlSession(Session);
const sessionStore = new MySQLStore({}, connection);
app.use(
  session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

createConnection()
  .then(() => {
    app.use("/auth", authRoutes);

    app.use((req: Request, res: Response) => {
      res.sendStatus(404);
    });

    app.use((err: any, req: Request, res: Response) => {
      console.error("에러 발생");
      res.sendStatus(500);
    });

    app.listen(8080, () => {
      console.log("server starts");
    });
  })
  .catch((err) => {
    console.log(err);
  });
