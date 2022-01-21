export interface ClientNetwork {
  request(url: string, headers: HeadersInit, options?: any): Promise<any>;
  requestWithJson(url: string, options?: any): Promise<any>;
  requestWithFile(url: string, options?: any): Promise<any>;
}

export type NetworkConstructor = {
  new (url: string): ClientNetwork;
};

export class HttpClient implements ClientNetwork {
  constructor(private baseURL: string) {}

  async request(url: string, options: any, headers?: HeadersInit): Promise<any> {
    let init: RequestInit = {
      ...options,
      credentials: "include",
    };
    if (headers) {
      init.headers = headers;
    }

    const response: Response = await fetch(`${this.baseURL}${url}`, init);
    let data: any;
    try {
      data = await response.json();
    } catch (err) {
      console.error(err);
    }

    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : "something wrong.. 😥";
      const error = new Error(message);
      throw error;
    }
    return data;
  }

  async requestWithJson(url: string, options: any): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    return this.request(url, options, headers);
  }

  async requestWithFile(url: string, options: any): Promise<any> {
    const headers: HeadersInit = {};
    return this.request(url, options, headers);
  }
}
