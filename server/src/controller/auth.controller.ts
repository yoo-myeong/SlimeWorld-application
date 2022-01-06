import { Request, Response } from "express";
import { UserEntity } from "../data/auth/auth.entity.js";

type EntityConstructor = { new (): UserEntity };

export class authController {
  private User: UserEntity;
  constructor(Entity: EntityConstructor) {
    this.User = new Entity();
  }

  async singup(req: Request, res: Response): Promise<Response> {
    const signupData = req.body;
    const result = await this.User.signup(signupData);
    if (result) {
      return res.sendStatus(201);
    }
    return res.sendStatus(400);
  }
}
