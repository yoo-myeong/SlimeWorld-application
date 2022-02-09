import "reflect-metadata";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { sessionOption } from "./middleware/session.js";
import { config } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import slimeRoutes from "./routes/slime.routes.js";
import { logger, loggerStream } from "./config/winston.js";

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
  credentials: true,
};

const typeorm: any = config.typeorm;
createConnection({
  ...typeorm,
})
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(morgan("short", { stream: new loggerStream() }));
    app.use(helmet());
    app.use(cors(corsOption));
    app.use(session(sessionOption));

    app.use("/auth", authRoutes);
    app.use("/slime", slimeRoutes);

    app.use((req: Request, res: Response) => {
      res.sendStatus(404);
    });

    app.use((err: any, req: Request, res: Response) => {
      logger.error(err);
      res.sendStatus(500);
    });

    const port = 4200;
    app.listen(port, () => {
      logger.info(`server started on ${port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
