import { Request, Response } from "express";
import { SlimeOption, SlimePost } from "../entity/slime.entity.js";
import { postData, postService, postServiceConstructor } from "./../Service/slime.service.js";

export interface postController {
  getPost(req: Request, res: Response): Promise<Response>;
  createPost(req: Request, res: Response): Promise<Response>;
  deletePost(req: Request, res: Response): Promise<Response>;
  getTags(req: Request, res: Response): Promise<Response>;
}

export type postControllerConstructor = {
  new (Service: postServiceConstructor): postController;
};

export class SlimeController implements postController {
  private slimeService: postService;
  constructor(Service: postServiceConstructor) {
    this.slimeService = new Service(SlimePost, SlimeOption);
  }

  async getPost(req: Request, res: Response): Promise<Response> {
    const post = await this.slimeService.getPost();
    return res.status(201).json(post);
  }

  async createPost(req: Request, res: Response): Promise<Response> {
    const data: postData = req.body;
    if (!req.session.is_logined) {
      return res.status(403).json({ message: "로그인이 필요합니다." });
    }
    try {
      const userId = req.session.userId;
      const post = await this.slimeService.createPost(data, userId);
      return res.status(200).json({ postId: post.id });
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  }

  async deletePost(req: Request, res: Response): Promise<Response> {
    const postId = req.params.id;
    const userId = req.session.userId;
    try {
      await this.slimeService.deletePost(postId, userId);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.sendStatus(403);
    }
  }

  async getTags(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const tags = await this.slimeService.getTags(id);
      return res.status(201).json(tags);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
}
