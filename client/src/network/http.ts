export interface ClientNetwork {
  request(url: string, options?: any): Promise<any>;
}

export type NetworkConstructor = {
  new (url: string): ClientNetwork;
};

export class HttpClient implements ClientNetwork {
  constructor(private baseURL: string) {}

  async request(url: string, options?: any) {
    let init: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    if (options) {
      init = { ...options, ...init };
      if (options.headers) {
        init.headers = { ...init.headers, ...options.headers };
      }
    }

    const response: Response = await fetch(`${this.baseURL}${url}`, init);
    let responseJsonData: any;
    try {
      responseJsonData = await response.json();
    } catch (err) {
      // 백엔드에서 json포맷으로 보내지 않았거나 상태코드만 보냈을 때
      console.error(err);
    }

    // 비정상 상태코드일 때 백엔드에서 보낸 메시지가 없다면 기본 에러메시지를 전달
    if (response.status > 299 || response.status < 200) {
      const message = responseJsonData && responseJsonData.message ? responseJsonData.message : "something wrong.. 😥";
      const error = new Error(message);
      throw error;
    }

    return responseJsonData;
  }
}
