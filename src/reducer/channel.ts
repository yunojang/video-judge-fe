import { AnyAction } from '@reduxjs/toolkit';
import { makeActionFunction } from './utils';

const resource = 'channel';
const makeAction = makeActionFunction(resource);

// action
const actions = {
  save: makeAction('Save'),
  modify: makeAction('Modifiy'),
};

// action creators
export const save = () => {
  return {
    type: actions.save,
  };
};
export const modify = () => {
  return {
    type: actions.modify,
  };
};

interface ChannelState {
  hasUnSave: boolean;
}

const initialState: ChannelState = {
  hasUnSave: false,
};

const channelReducer = (
  state: ChannelState = initialState,
  { type }: AnyAction,
): ChannelState => {
  switch (type) {
    case actions.save: {
      return {
        ...state,
        hasUnSave: false,
      };
    }
    case actions.modify: {
      return {
        ...state,
        hasUnSave: true,
      };
    }
    default:
      return state;
  }
};

export default channelReducer;
