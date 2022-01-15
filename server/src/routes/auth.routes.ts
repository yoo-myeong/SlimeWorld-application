import express from "express";
import { authController, UserController } from "../controller/auth.controller.js";
import { UserService } from "../service/auth.service.js";

export const router = express.Router();

router.post("/signup", (req, res) => {
  const userController: authController = new UserController(UserService);
  userController.singup(req, res);
});
router.post("/login", (req, res) => {
  const userController: authController = new UserController(UserService);
  userController.login(req, res);
});
router.post("/logout", (req, res) => {
  const userController: authController = new UserController(UserService);
  userController.logout(req, res);
});
router.get("/me", (req, res) => {
  const userController: authController = new UserController(UserService);
  userController.me(req, res);
});

export default router;
