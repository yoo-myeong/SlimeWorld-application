import { baseURL } from "../app.js";
import { ClientNetwork, NetworkConstructor } from "../network/http.js";

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
  new (constructor: NetworkConstructor): AuthService;
};

export class AuthFetchService implements AuthService {
  private network: ClientNetwork;
  constructor(constructor: NetworkConstructor) {
    this.network = new constructor(baseURL);
  }

  async singup(data: SingupFormat) {
    return this.network.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginFormat) {
    return this.network.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.network.request("/auth/logout", {
      method: "POST",
    });
  }

  async me(): Promise<MeFormat> {
    return this.network.request("/auth/me", {
      method: "GET",
    });
  }
}
