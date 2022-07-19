import { AnyAction } from '@reduxjs/toolkit';

import Client from 'src/utils/connection';
import { ResponseError } from 'src/utils/connection/types';

import { Channel } from 'src/model/channel';
import { makeActionFunction, reject, request, success } from './utils';

const resource = 'channel/dashboard';
const makeAction = makeActionFunction(resource);

// action
const actions = {
  fetch: makeAction('Fetch'),
};

// action creators
export const fetch = () => {
  return {
    type: actions.fetch,
    payload: Client.get({ endPoint: `api/${resource}` }),
  };
};

interface DashboardState {
  current: Channel[];
  loading: boolean;
  error: ResponseError | null;
}

const initialState: DashboardState = {
  current: [],
  loading: false,
  error: null,
};

const dashboardReducer = (
  state: DashboardState = initialState,
  { type, payload }: AnyAction,
): DashboardState => {
  switch (type) {
    case request(actions.fetch): {
      return {
        ...state,
        loading: true,
      };
    }
    case success(actions.fetch): {
      return {
        ...state,
        current: payload.json,
        loading: false,
      };
    }
    case reject(actions.fetch): {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
