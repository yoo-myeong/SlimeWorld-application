import { getRepository } from "typeorm";

export type SingupData = {
  id?: number;
  email: string;
  username: string;
  password: string;
  position: "seller" | "buyer";
};

export interface authEntityService {
  getUserByEmail(email: string): Promise<any>;
  getUser(userId: number): Promise<any>;
  createUser(data: SingupData): Promise<any>;
}

type Constructor = { new (): {} };

export class authService implements authEntityService {
  constructor(private UserRepository: Constructor) {}

  async getUser(userId: number): Promise<any> {
    const repository = getRepository(this.UserRepository);
    return repository.findOne({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<any> {
    const repository = getRepository(this.UserRepository);
    return repository.findOne({ email });
  }

  async createUser(data: SingupData): Promise<any> {
    const repository = getRepository(this.UserRepository);
    const model = new this.UserRepository();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      model[key] = data[key];
    });
    return repository.save(model);
  }
}
