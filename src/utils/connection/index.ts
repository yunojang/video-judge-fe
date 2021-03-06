import { ClientClass } from './ClientClass';
import { ClientConfig, ClientInterface } from './types';

// do not expose
let singletonInstance: ClientInterface | undefined;

const getInstance = () => {
  if (!singletonInstance) {
    throw new Error('Please call configureClient(...) before request');
  }

  return singletonInstance;
};

// connection module
const Client: ClientInterface = {
  get: config => getInstance().get(config),
  post: config => getInstance().post(config),
  delete: config => getInstance().delete(config),
  put: config => getInstance().put(config),
  request: config => getInstance().request(config),
};

// client setup
export const configureClient = (config: ClientConfig) => {
  singletonInstance = new ClientClass(config);
};

configureClient({});

export default Client;
