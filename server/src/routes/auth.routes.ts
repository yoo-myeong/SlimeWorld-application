import express from "express";
import "express-async-errors";
import { authController } from "../controller/auth.controller.js";
import { User } from "../data/auth.entity.js";
import { authService } from "../service/auth.service.js";

export const router = express.Router();

router.get("/me", (req, res) => {
  console.log(req.session);
  res.send("hi");
});

router.post("/", (req, res) => {
  console.log(req.session);
  new authController(User, authService).singup(req, res);
});

export default router;
