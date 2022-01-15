import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import { userData, authService, authServiceConstructor } from "../service/auth.service.js";
import { User } from "../data/auth.entity.js";

export interface authController {
  singup(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  logout(req: Request, res: Response): Promise<void>;
  me(req: Request, res: Response): Promise<void>;
}

export type authControllerConstructor = {
  new (Service: authServiceConstructor): authController;
};

export class UserController implements authController {
  private authService: authService;
  constructor(Service: authServiceConstructor) {
    this.authService = new Service(User);
  }

  async checkEmailExitance(email: string): Promise<boolean> {
    const EmailInUser = await this.authService.getUserByEmail(email);
    return EmailInUser ? true : false;
  }

  async singup(req: Request, res: Response): Promise<Response> {
    const { email, password, username, position }: userData = req.body;
    if (password.length < 6 || password.length > 15) {
      return res.status(400).json({ message: "비밀번호 길이는 6 이상 15 이하" });
    }
    const EmailExitance = await this.checkEmailExitance(email);
    if (EmailExitance) return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const hashedSignupData = { email, password: hashedPassword, username, position };
    try {
      await this.authService.createUser(hashedSignupData);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      req.session.destroy(() => {});
      return res.status(400).json({ message: "잘못된 형식의 데이터 전달" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password }: userData = req.body;
    try {
      const user = await this.authService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "unAuthorized" });
      }
      const compared = await bcrypt.compare(password, user.password);
      if (!compared) {
        return res.status(401).json({ message: "unAuthorized" });
      }
      req.session.is_logined = true;
      req.session.userId = user.id;
      req.session.dispayName = user.username;
      req.session.position = user.position;
      req.session.save(() => {
        return res.sendStatus(202);
      });
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy((): Response => {
      return res.sendStatus(200);
    });
  }

  async me(req: Request, res: Response): Promise<void> {
    if (req.session.is_logined) {
      const username = req.session.dispayName;
      const position = req.session.position;
      res.status(200).json({ username, position });
    } else {
      res.status(401).json({ message: "invalid session id" });
    }
  }
}
