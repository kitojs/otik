type ClientOptions = {
  headers?: Record<string, string>;
  timeout?: number;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  headers?: Record<string, string>;
  body?: any;
}

class Client {
  private options: ClientOptions;

  constructor(options?: ClientOptions) {
    const DEFAULT_OPTIONS: ClientOptions = {
      headers: {},
      timeout: 5000,
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  private async request<T>(
    method: HttpMethod,
    url: string,
    config?: RequestConfig,
  ): Promise<T> {
    // todo
  }

  async get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", url, config);
  }

  async post<T = unknown>(
    url: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("POST", url, { ...config, body });
  }

  async put<T = unknown>(
    url: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("PUT", url, { ...config, body });
  }

  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, config);
  }

  async patch<T = unknown>(
    url: string,
    body?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>("PATCH", url, { ...config, body });
  }
}

function client(options?: ClientOptions): Client {
  return new Client(options);
}

export { client, ClientOptions, RequestConfig };
