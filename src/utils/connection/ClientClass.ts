import promiseWithTimeout from '../promiseWithTimeout';
import parseResponse from './parseResponse';
import { ClientConfig, ParseMethod, RequestBase, RequestConfig } from './types';

const DEAFULT_ORIGIN = 'http:/localhost:3000';
const DEFAULT_TIMEOUT = 20000;

// connection feature
export class ClientClass {
  url: string;
  origin: string;
  timeout: number;

  constructor({
    url: inputUrl,
    origin = DEAFULT_ORIGIN,
    timeout = DEFAULT_TIMEOUT,
  }: ClientConfig) {
    const url = new URL(inputUrl ?? origin);
    this.url = url.href;
    this.origin = url.origin;
    this.timeout = timeout;
  }
  async get<T extends ParseMethod = 'json'>(
    config: RequestConfig & { parseMethod?: T },
  ) {
    return this.request<T>({ ...config, method: 'GET' });
  }
  async post<T extends ParseMethod = 'json'>(
    config: RequestConfig & { parseMethod?: T },
  ) {
    return this.request<T>({ ...config, method: 'POST' });
  }
  async put<T extends ParseMethod = 'json'>(
    config: RequestConfig & { parseMethod?: T },
  ) {
    return this.request<T>({ ...config, method: 'PUT' });
  }
  async delete<T extends ParseMethod = 'json'>(
    config: RequestConfig & { parseMethod?: T },
  ) {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  async request<T extends ParseMethod = 'json'>({
    url: inputUrl,
    parseMethod = 'json',
    timeout,
    endPoint,
    ...baseConfig
  }: RequestConfig & { parseMethod?: ParseMethod }) {
    const url = this.getUrl(inputUrl, endPoint);

    // Control any options
    const options: RequestBase = defaultConfig(baseConfig);

    const response = await promiseWithTimeout<Response>(
      fetch(url, options).catch(err => err),
      timeout ?? this.timeout,
    );

    const parsed = parseResponse<T>(response, parseMethod);

    if (!response.ok) {
      // const { code, message } = (parsed as any).json as ResponseError;
      // const err = { code, message };
      const isInvalidConnect = !response.status;
      if (isInvalidConnect) {
        return Promise.reject({ code: 400, message: response });
      }

      const err = {
        code: response.status,
        message: response.statusText,
      };

      return Promise.reject(err);
    } else {
      return parsed;
    }
  }
  getUrl(url?: string, endPoint?: string) {
    if (url) {
      return url;
    }

    if (endPoint) {
      const path = endPoint[0] !== '/' ? '/' + endPoint : endPoint;
      return this.origin + path;
    }

    return this.url;
  }
}

const defaultConfig = ({
  headers = { 'Content-Type': 'application/json' },
  ...rest
}: RequestBase) => {
  return {
    headers,
    ...rest,
  };
};
