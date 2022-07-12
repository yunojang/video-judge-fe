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
export const updateChannel = (channelObject: Partial<ChannelObject>) => {
  return {
    type: actions.updateChannel,
    payload: channelObject,
  };
};
export const resetChannel = () => {
  return {
    type: actions.updateChannel,
    payload: new ChannelObject({}),
  };
};
export const saveChannel = () => {
  return {
    type: actions.setIsModified,
  };
};

interface ChannelState {
  current: ChannelObject;
  isModified: boolean;
}

const initialState: ChannelState = {
  current: new ChannelObject({}),
  isModified: false,
};

const canvasReduer = (
  state: ChannelState = initialState,
  { type, payload }: AnyAction,
): ChannelState => {
  switch (type) {
    case actions.updateChannel: {
      console.log(payload);
      return {
        ...state,
        current: { ...state.current, ...payload },
        isModified: true,
      };
    }
    case actions.setIsModified: {
      return {
        ...state,
        isModified: false,
      };
    }
    default:
      return state;
  }
};

export default canvasReduer;
