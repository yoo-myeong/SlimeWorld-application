import "reflect-metadata";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.post("/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

createConnection()
  .then(() => {
    app.listen(8080, () => {
      console.log("server starts");
    });
  })
  .catch((err) => {
    console.log(err);
  });
