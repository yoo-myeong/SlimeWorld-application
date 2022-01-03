import express, { Request, Response } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/", (req: Request, res: Response) => {
  res.send("Hallu");
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
