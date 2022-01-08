import { getRepository } from "typeorm";
import { authEntity } from "../data/auth.entity";

export type AuthData = {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  position?: "seller" | "buyer";
};

export interface authEntityService {
  getUser(userId: number): Promise<authEntity>;
  getUserByEmail(email: string): Promise<authEntity>;
  createUser(data: AuthData): Promise<authEntity>;
}

export type authEntityConstructor = { new (): authEntity };

export class authService implements authEntityService {
  constructor(private UserRepository: authEntityConstructor) {}

  async getUser(userId: number): Promise<authEntity> {
    const repository = getRepository(this.UserRepository);
    return repository.findOne({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<authEntity> {
    const repository = getRepository(this.UserRepository);
    return repository.findOne({ email });
  }

  async createUser(data: AuthData): Promise<authEntity> {
    const repository = getRepository(this.UserRepository);
    const model = new this.UserRepository();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      model[key] = data[key];
    });
    return repository.save(model);
  }
}
