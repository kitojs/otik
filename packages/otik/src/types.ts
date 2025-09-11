export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  validateResponse?: boolean;
}

export interface ClientConfig {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  retries?: number;
  validateResponse?: boolean;
}

export interface SerializedRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: Uint8Array;
  schema?: SerializedSchema;
  options: RequestOptions;
}

export interface SerializedSchema {
  type: string;
  properties?: Record<string, SerializedSchema>;
  items?: SerializedSchema;
  required?: string[];
  nullable?: boolean;
}

export interface RawResponse {
  status: number;
  headers: Record<string, string>;
  body: Uint8Array;
}
