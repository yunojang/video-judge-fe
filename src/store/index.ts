import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './rootReducer';

export type RootState = ReturnType<typeof reducer>;

export default function getStore(): Store {
  const middleware = [logger, promiseMiddleware];

  return configureStore({ reducer, middleware });
}
