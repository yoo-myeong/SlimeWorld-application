import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import path from "path";
import { postController, SlimeController } from "../controller/slime.controller.js";
import { SlimeService } from "../service/slime.service.js";
import { config } from "../config.js";

export const router = express.Router();

AWS.config.update({
  accessKeyId: config.aws.s3.accessKeyId,
  secretAccessKey: config.aws.s3.secretAccessKey,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "slimepost",
    key(req, file, cb) {
      cb(null, `post/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
});

router.get("/", (req, res) => {
  const slimeController: postController = new SlimeController(SlimeService);
  slimeController.getPost(req, res);
});

router.post("/image", upload.single("image"), (req, res) => {
  req.body.mediaURL = req.file["location"];
  const slimeController: postController = new SlimeController(SlimeService);
  slimeController.createPost(req, res);
});

router.post("/video", (req, res) => {
  const slimeController: postController = new SlimeController(SlimeService);
  slimeController.createPost(req, res);
});

router.delete("/:id", (req, res) => {
  const slimeController: postController = new SlimeController(SlimeService);
  slimeController.deletePost(req, res);
});

export default router;
