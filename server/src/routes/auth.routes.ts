import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../data/auth/auth.entity.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const result = await userRepository.save(req.body);
    console.log(result);
  } catch (error) {
    console.error("error");
  }
  res.sendStatus(201);
});

export default router;
