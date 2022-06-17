import promiseWithTimeout from '../promiseWithTimeout';
import parseResponse from './parseResponse';
import { ClientConfig, ParseMethod, RequestConfig } from './types';

const DEAFULT_ORIGIN = 'http://localhost:3000';

// connection feature
export class ClientClass {
  url: string;
  origin: string;

  constructor({ url: inputUrl, origin = DEAFULT_ORIGIN }: ClientConfig) {
    const url = new URL(inputUrl ?? origin);
    this.url = url.href;
    this.origin = url.origin;
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
    timeout,
    parseMethod,
    endPoint,
    ...restConfig
  }: RequestConfig & { parseMethod?: T }) {
    const url = this.getUrl(inputUrl, endPoint);

    // Control any options

    const options = { ...restConfig };

    const response = await promiseWithTimeout<Response>(
      fetch(url, options),
      timeout,
    );

    return parseResponse<T>(response, parseMethod);
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
