import { authEntity } from "../data/auth.entity";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import { SingupData, authEntityService, authService } from "../service/auth.service.js";

type authEntityConstructor = {
  new (): authEntity;
};

type authServiceConstructor = {
  new (Entity: any): authService;
};

export class authController {
  private authService: authEntityService;

  constructor(Entity: authEntityConstructor, Service: authServiceConstructor) {
    this.authService = new Service(Entity);
  }

  async checkEmailExitance(email: string): Promise<boolean> {
    const EmailInUser = await this.authService.getUserByEmail(email);
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
      const user = await this.authService.createUser(signupData);
      req.session.is_logined = true;
      req.session.userId = user.id;
      req.session.dispayName = user.username;
      req.session.save(() => {
        return res.sendStatus(201);
      });
    } catch (error) {
      console.error(error);
      req.session.destroy(() => {});
      return res.status(400).json("잘못된 형식의 데이터 전달");
    }
  }
}
