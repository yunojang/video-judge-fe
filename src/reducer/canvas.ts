import { AnyAction } from '@reduxjs/toolkit';
import { makeActionFunction } from './utils';

const resource = 'canvas';
const makeAction = makeActionFunction(resource);

export type EditMode = 'rect' | 'poly' | false;

// action
const canvasAction = {
  setMode: makeAction('SetMode'),
};

// action creators
export const setEditMode = (mode: EditMode) => {
  return {
    type: canvasAction.setMode,
    payload: mode,
  };
};

interface CanvasState {
  editMode: EditMode;
}

const initialState: CanvasState = {
  editMode: false,
};

const canvasReduer = (
  state: CanvasState = initialState,
  { type, payload }: AnyAction,
): CanvasState => {
  switch (type) {
    case canvasAction.setMode: {
      return {
        ...state,
        editMode: payload,
      };
    }
    default:
      return state;
  }
};

export default canvasReduer;
