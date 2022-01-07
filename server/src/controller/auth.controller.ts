import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { SingupData, User, UserEntity } from "../data/auth/auth.entity.js";
import bcrypt from "bcrypt";
import { config } from "../config.js";

type EntityConstructor = { new (): UserEntity };

export class authController {
  private User: UserEntity;

  constructor(Entity: EntityConstructor) {
    this.User = new Entity();
  }

  async checkEmailExitance(email: string): Promise<boolean> {
    const EmailInUser = await getRepository(User).findOne({ email });
    return EmailInUser ? true : false;
  }

  async singup(req: Request, res: Response): Promise<Response> {
    const { email, password, username, position }: SingupData = req.body;
    if (password.length < 6 || password.length > 15) {
      return res.status(400).json("비밀번호 길이는 6 이상 15 이하");
    }
    const EmailExitance = await this.checkEmailExitance(email);
    if (EmailExitance) return res.sendStatus(409);
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const signupData = { email, password: hashedPassword, username, position };
    try {
      await this.User.createUser(signupData);
      req.session.is_logined = true;
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      return res.status(400).json("잘못된 형식의 데이터 전달");
    }
  }
}
