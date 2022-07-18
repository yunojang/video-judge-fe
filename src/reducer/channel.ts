import { AnyAction } from '@reduxjs/toolkit';
import { makeActionFunction } from './utils';

const resource = 'channel';
const makeAction = makeActionFunction(resource);

// action
const actions = {
  save: makeAction('Save'),
  modify: makeAction('Modifiy'),
  setPrviewUrl: makeAction('SetPrview'),
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
export const setPrviewUrl = (url: string) => {
  return {
    type: actions.setPrviewUrl,
    payload: url,
  };
};

interface ChannelState {
  hasUnSave: boolean;
  showPreview: boolean;
  previewUrl: string | null;
}

const initialState: ChannelState = {
  hasUnSave: false,
  showPreview: false,
  previewUrl: null,
};

const channelReducer = (
  state: ChannelState = initialState,
  { type, payload }: AnyAction,
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
    case actions.setPrviewUrl: {
      return {
        ...state,
        previewUrl: payload,
        showPreview: true,
      };
    }
    default:
      return state;
  }
};

export default channelReducer;
