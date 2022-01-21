import { baseURL } from "../app.js";
import { ClientNetwork, NetworkConstructor } from "../connection/http.js";

type LoginFormat = {
  email: string;
  password: string;
};

type MeFormat = {
  username: string;
  position: "seller" | "buyer";
};

type SingupFormat = MeFormat & LoginFormat;

export interface AuthService {
  singup(data: SingupFormat): Promise<any>;
  login(data: LoginFormat): Promise<any>;
  logout(): Promise<any>;
  me(): Promise<any>;
}

export type AuthServiceConstructor = {
  new (network: NetworkConstructor): AuthService;
};

export class AuthFetchService implements AuthService {
  private network: ClientNetwork;
  constructor(network: NetworkConstructor) {
    this.network = new network(baseURL);
  }

  async singup(data: SingupFormat) {
    return this.network.requestWithJson("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginFormat) {
    return this.network.requestWithJson("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.network.requestWithJson("/auth/logout", {
      method: "POST",
    });
  }

  async me(): Promise<MeFormat> {
    return this.network.requestWithJson("/auth/me", {
      method: "GET",
    });
  }
}
