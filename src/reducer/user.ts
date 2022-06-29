import { AnyAction } from 'redux';
import { User, UserPublic } from '../model/user';
import { request, success, reject, makeActionFunction } from './utils';

import Client from '../utils/connection';

// Actions && Action Types
const resource = 'user';
const makeAction = makeActionFunction(resource);

const UserActions = {
  create: makeAction('Create'),
  update: makeAction('Update'),
  remove: makeAction('Remove'),
  load: makeAction('Load'),
};

// Action Creators
export function loadUser(token: number) {
  return {
    type: UserActions.load,
    payload: Client.get({ endPoint: `${resource}/${token}` }),
  };
}

interface UserState {
  userIdx: number | null;
  user: UserPublic;
  flag: boolean;
  loading: boolean;
}

// States
const initialState: UserState = {
  userIdx: null,
  user: { name: '' },
  flag: false,
  loading: false,
};

export function createUser(user: User) {
  const body = JSON.stringify(user);

  return {
    type: UserActions.create,
    payload: Client.post({ endPoint: `users`, body }),
  };
}

// Reducer
export default (
  state = initialState,
  { type, payload }: AnyAction,
): UserState => {
  switch (type) {
    // do reducer stuff
    case request(UserActions.load): {
      return { ...state, loading: true };
    }

    case success(UserActions.load): {
      const {
        json: { name, id },
      } = payload;

      return {
        ...state,
        userIdx: id,
        flag: true,
        user: { ...state.user, name },
        loading: false,
      };
    }

    case reject(UserActions.load): {
      return {
        ...state,
        flag: false,
        loading: false,
      };
    }

    default:
      return state;
  }
};
