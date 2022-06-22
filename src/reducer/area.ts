// temp

import { AnyAction } from 'redux';
import { request, success, reject, makeActionFunction } from './utils';

import Client from '../utils/connection';
import { Area, AreaObject } from 'src/model/channel';

// Actions && Action Types
const resource = 'areas';
const makeAction = makeActionFunction(resource);

const AreaActions = {
  load: makeAction('Load'),
  create: makeAction('Create'),
  update: makeAction('Update'),
  remove: makeAction('Remove'),
};

// Action Creators
export function loadArea(parentId: number) {
  return {
    type: AreaActions.load,
    payload: Client.get({ endPoint: `${resource}` }).then(({ json }) =>
      json.filter((item: Area) => item.channelId === parentId),
    ),
  };
}

export function createArea(area: AreaObject) {
  const body = JSON.stringify(area);

  return {
    type: AreaActions.create,
    payload: Client.post({ endPoint: `${resource}`, body }),
  };
}

interface AreaState {
  area: AreaObject[];
  loading: boolean;
  error: string;
}

// States
const initialState: AreaState = {
  area: [],
  loading: false,
  error: '',
};

// Reducer
export default (
  state = initialState,
  { type, payload }: AnyAction,
): AreaState => {
  switch (type) {
    // do reducer stuff
    case request(AreaActions.load): {
      return { ...state, loading: true };
    }

    case success(AreaActions.load): {
      const { json } = payload;
      const area = json.map(({ id, ...rest }: Area) => rest);

      return {
        ...state,
        loading: false,
        area,
      };
    }

    case reject(AreaActions.load): {
      const { error } = payload;
      return {
        ...state,
        area: [],
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
};
