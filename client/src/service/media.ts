import { NetworkConstructor } from "../connection/http.js";
import { ClientNetwork } from "../connection/http.js";
import { baseURL } from "../app.js";

export type imageUploadFormat = {
  title: string;
  description: string;
  saleSite: string;
  media?: string;
  options: string[];
};

export interface mediaService {
  getMedia(writer?: string): Promise<any>;
  postMedia(data: any, postType: "json" | "file"): Promise<any>;
}

export type mediaServiceConstructor = {
  new (network: NetworkConstructor): mediaService;
};

export class mediaFetchService implements mediaService {
  private network: ClientNetwork;
  constructor(network: NetworkConstructor) {
    this.network = new network(baseURL);
  }

  async getMedia(writer?: string): Promise<any> {
    const url = writer ? `/slime/${writer}` : `/slime`;
    return this.network.requestWithJson(url, {
      method: "GET",
    });
  }

  async postMedia(data: any, postType: "json" | "file"): Promise<any> {
    if (postType === "file") {
      const body = new FormData();
      for (const key in data) {
        if (data[key] instanceof Array) {
          data[key].forEach((value: string) => {
            body.append(key, value);
          });
        } else {
          body.append(key, data[key]);
        }
      }
      return this.network.requestWithFile(`/slime/${data.media}`, {
        method: "POST",
        body,
      });
    } else if (postType === "json") {
      return this.network.requestWithJson(`/slime/${data.media}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    }
  }
}
