import express from "express";
import { postController, SlimeController } from "../controller/slime.controller.js";
import { SlimeService } from "../Service/slime.service.js";

export const router = express.Router();

router.post("/", (req, res) => {
  const slimeController: postController = new SlimeController(SlimeService);
  slimeController.createPost(req, res);
});

export default router;
