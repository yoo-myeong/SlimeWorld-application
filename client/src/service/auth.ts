import { ClientNetwork } from "../network/http";

type LoginFormat = {
  email: string;
  password: string;
};

export type MeResponseData = {
  username: string;
  position: "seller" | "buyer";
};

type SingupFormat = MeResponseData & LoginFormat;

export default class AuthService {
  constructor(private network: ClientNetwork) {
    this.network = network;
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

  async me(): Promise<MeResponseData> {
    return this.network.request("/auth/me", {
      method: "GET",
    });
  }
}
