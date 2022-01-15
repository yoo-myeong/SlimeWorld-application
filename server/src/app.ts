import "reflect-metadata";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { sessionOption } from "./middleware/session.js";
import { config } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import slimeRoutes from "./routes/slime.routes.js";

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  credentials: true,
};

createConnection()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(helmet());
    app.use(cors(corsOption));
    app.use(session(sessionOption));

    app.use("/auth", authRoutes);
    app.use("/slime", slimeRoutes);

    app.use((req: Request, res: Response) => {
      res.sendStatus(404);
    });

    app.use((err: any, req: Request, res: Response) => {
      console.error("err");
      res.sendStatus(500);
    });

    app.listen(8080, () => {
      console.log("server starts");
    });
  })
  .catch((err) => {
    console.log(err);
  });
