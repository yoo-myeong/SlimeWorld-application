import "reflect-metadata";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((err: any, req: Request, res: Response) => {
  console.error("에러 발생");
  res.sendStatus(500);
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
