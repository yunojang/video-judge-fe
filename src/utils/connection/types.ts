import { ClientClass } from './ClientClass';

export type ClientInterface = Pick<
  ClientClass,
  'get' | 'request' | 'delete' | 'put' | 'post'
>;

export interface ClientConfig {
  url?: string;
  origin?: string;
}

export interface RequestBase {
  body?: RequestInit['body'];
  credentials?: RequestInit['credentials'];
  headers?: RequestInit['headers'];
  mode?: RequestInit['mode'];
  host?: string;
  method?: RequestMethod;
  timeout?: number;
}

export interface RequestWithEndpoint extends RequestBase {
  url?: string;
  endPoint: string;
}

export interface RequestWithUrl extends RequestBase {
  url: string;
  endPoint?: string;
}

export type RequestConfig = RequestWithUrl | RequestWithEndpoint;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ParseMethod = 'json' | 'text' | 'raw' | null | undefined;

export type JsonPrimitive = number | string | boolean | null;
export type JsonArray = Array<JsonPrimitive>;
export type StrictValue = JsonPrimitive | JsonArray | JsonObject;
export type JsonStrictObject = { [key: string]: StrictValue };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonObject = { [key: string]: any };

export interface JsonResponse {
  json: JsonObject;
  response: Response;
}

export interface TextResponse {
  text: string;
  response: Response;
}
