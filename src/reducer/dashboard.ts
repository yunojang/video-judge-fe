import { AnyAction } from '@reduxjs/toolkit';

import Client from 'src/utils/connection';
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
  error: string | null;
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
        error: 'Failed to fetch dashboard',
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
