import type { Schema } from "./schema";
import type {
  ClientConfig,
  RawResponse,
  RequestOptions,
  SerializedRequest,
} from "./types";

export class Client {
  private config: Required<ClientConfig>;

  constructor(config: ClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || "",
      defaultHeaders: config.defaultHeaders || {},
      timeout: config.timeout || 30000,
      retries: config.retries || 0,
      validateResponse: config.validateResponse ?? true,
    };
  }

  async get<T>(
    url: string,
    schema: Schema<T>,
    options?: RequestOptions,
  ): Promise<T>;
  async get(url: string, options?: RequestOptions): Promise<RawResponse>;
  async get<T>(
    url: string,
    schemaOrOptions?: Schema<T> | RequestOptions,
    options?: RequestOptions,
  ): Promise<T | RawResponse> {
    if (schemaOrOptions && "serialize" in schemaOrOptions) {
      return this.request("GET", url, schemaOrOptions, undefined, options);
    }

    return this.requestRaw(
      "GET",
      url,
      undefined,
      schemaOrOptions as RequestOptions,
    );
  }

  async post<T>(
    url: string,
    schema: Schema<T>,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any,
    options?: RequestOptions,
  ): Promise<T>;
  async post(
    url: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any,
    options?: RequestOptions,
  ): Promise<RawResponse>;
  async post<T>(
    url: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    schemaOrBody?: Schema<T> | any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    bodyOrOptions?: any | RequestOptions,
    options?: RequestOptions,
  ): Promise<T | RawResponse> {
    if (schemaOrBody && "serialize" in schemaOrBody) {
      return this.request("POST", url, schemaOrBody, bodyOrOptions, options);
    }

    return this.requestRaw(
      "POST",
      url,
      schemaOrBody,
      bodyOrOptions as RequestOptions,
    );
  }

  async put<T>(
    url: string,
    schema: Schema<T>,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any,
    options?: RequestOptions,
  ): Promise<T>;
  async put(
    url: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any,
    options?: RequestOptions,
  ): Promise<RawResponse>;
  async put<T>(
    url: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    schemaOrBody?: Schema<T> | any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    bodyOrOptions?: any | RequestOptions,
    options?: RequestOptions,
  ): Promise<T | RawResponse> {
    if (schemaOrBody && "serialize" in schemaOrBody) {
      return this.request("PUT", url, schemaOrBody, bodyOrOptions, options);
    }

    return this.requestRaw(
      "PUT",
      url,
      schemaOrBody,
      bodyOrOptions as RequestOptions,
    );
  }

  async delete<T>(
    url: string,
    schema: Schema<T>,
    options?: RequestOptions,
  ): Promise<T>;
  async delete(url: string, options?: RequestOptions): Promise<RawResponse>;
  async delete<T>(
    url: string,
    schemaOrOptions?: Schema<T> | RequestOptions,
    options?: RequestOptions,
  ): Promise<T | RawResponse> {
    if (schemaOrOptions && "serialize" in schemaOrOptions) {
      return this.request("DELETE", url, schemaOrOptions, undefined, options);
    }

    return this.requestRaw(
      "DELETE",
      url,
      undefined,
      schemaOrOptions as RequestOptions,
    );
  }

  private async request<T>(
    method: string,
    url: string,
    schema: Schema<T>,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    body?: any,
    options: RequestOptions = {},
  ): Promise<T> {
    const serializedRequest = this.serializeRequest(
      method,
      url,
      schema,
      body,
      options,
    );

    return null as T; // to-do
  }

  private async requestRaw(
    method: string,
    url: string,
    body?: any,
    options: RequestOptions = {},
  ): Promise<RawResponse> {
    const serializedRequest = this.serializeRequest(
      method,
      url,
      undefined,
      body,
      options,
    );

    return null as unknown as RawResponse; // to-do
  }

  private serializeRequest(
    method: string,
    url: string,
    schema?: Schema<any>,
    body?: any,
    options: RequestOptions = {},
  ): SerializedRequest {
    const fullUrl = this.config.baseURL
      ? new URL(url, this.config.baseURL).toString()
      : url;

    const headers = {
      ...this.config.defaultHeaders,
      ...options.headers,
    };

    let serializedBody: Uint8Array | undefined;
    if (body !== undefined) {
      if (body instanceof Uint8Array) {
        serializedBody = body;
      } else {
        const bodyStr = typeof body === "string" ? body : JSON.stringify(body);
        serializedBody = new TextEncoder().encode(bodyStr);
        if (!headers["content-type"]) {
          headers["content-type"] =
            typeof body === "string" ? "text/plain" : "application/json";
        }
      }
    }

    return {
      method,
      url: fullUrl,
      headers,
      body: serializedBody,
      schema: schema?.serialize(),
      options: {
        timeout: options.timeout ?? this.config.timeout,
        retries: options.retries ?? this.config.retries,
        validateResponse:
          options.validateResponse ?? this.config.validateResponse,
        ...options,
      },
    };
  }
}
