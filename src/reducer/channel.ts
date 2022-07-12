import { AnyAction } from '@reduxjs/toolkit';
import { ChannelObject } from 'src/model/channel';
import { makeActionFunction } from './utils';

const resource = 'channel';
const makeAction = makeActionFunction(resource);

// action
const actions = {
  updateChannel: makeAction('UpdateChannel'),
  setIsModified: makeAction('SetModified'),
};

// action creators
export const updateChannel = (
  channel: Partial<ChannelObject>,
  isInitalize = false,
) => {
  return {
    type: actions.updateChannel,
    payload: { channel, isInitalize },
  };
};
export const resetChannel = () => {
  return {
    type: actions.updateChannel,
    payload: { channel: new ChannelObject({}) },
  };
};
export const save = () => {
  return {
    type: actions.setIsModified,
  };
};

interface ChannelState {
  current: ChannelObject;
  hasUnSave: boolean;
}

const initialState: ChannelState = {
  current: new ChannelObject({}),
  hasUnSave: false,
};

const canvasReduer = (
  state: ChannelState = initialState,
  { type, payload }: AnyAction,
): ChannelState => {
  switch (type) {
    case actions.updateChannel: {
      return {
        ...state,
        current: { ...state.current, ...payload.channel },
        hasUnSave: payload.isInitalize ? false : true,
      };
    }
    case actions.setIsModified: {
      return {
        ...state,
        hasUnSave: false,
      };
    }
    default:
      return state;
  }
};

export default canvasReduer;
