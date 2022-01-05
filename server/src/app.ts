import "reflect-metadata";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import helmet from "helmet";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.router.js";

const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./dist/routes/*.js"], // files containing annotations as above
};

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post("/", authRoutes);

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
