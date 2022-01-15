import { getRepository, Repository } from "typeorm";
import { authEntity, authEntityConstructor } from "../data/auth.entity.js";

export type userData = {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  position?: "seller" | "buyer";
};

export interface authService {
  getUser(userId: number): Promise<authEntity>;
  getUserByEmail(email: string): Promise<authEntity>;
  createUser(data: userData): Promise<authEntity>;
}

export type authServiceConstructor = {
  new (Entity: authEntityConstructor): authService;
};

export class UserService implements authService {
  private userRepository: Repository<authEntity>;
  constructor(private repository: authEntityConstructor) {
    this.userRepository = getRepository(repository);
  }

  async getUser(userId: number): Promise<authEntity> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<authEntity> {
    return this.userRepository.findOne({ email });
  }

  async createUser(data: userData): Promise<authEntity> {
    const model = new this.repository();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      model[key] = data[key];
    });
    return this.userRepository.save(model);
  }
}
