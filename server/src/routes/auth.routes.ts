import express from "express";
import "express-async-errors";
import { authController } from "../controller/auth.controller.js";
import { User } from "../data/auth.entity.js";
import { authService } from "../service/auth.service.js";

export const router = express.Router();

router.post("/signup", (req, res) => {
  new authController(User, authService).singup(req, res);
});
router.post("/login", (req, res) => {
  new authController(User, authService).login(req, res);
});
router.post("/logout", (req, res) => {
  new authController(User, authService).logout(req, res);
});
router.get("/me", (req, res) => {
  new authController(User, authService).me(req, res);
});

export default router;
