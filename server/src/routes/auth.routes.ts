import express from "express";
import "express-async-errors";
import { authController } from "../controller/auth.controller.js";
import { User } from "../data/auth/auth.entity.js";

export const router = express.Router();

router.post("/", (req, res) => {
  new authController(User).singup(req, res);
});

export default router;
