import { AnyAction } from '@reduxjs/toolkit';
import { makeActionFunction } from './utils';

const resource = 'canvas';
const makeAction = makeActionFunction(resource);

export type EditMode = 'rect' | 'poly' | false;

// action
const canvasAction = {
  setMode: makeAction('SetMode'),
  setContext: makeAction('SetContext'),
};

// action creators
export const setEditMode = (mode: EditMode) => {
  return {
    type: canvasAction.setMode,
    payload: mode,
  };
};

export const setContext = (ctx: CanvasRenderingContext2D) => {
  return {
    type: canvasAction.setContext,
    payload: ctx,
  };
};

interface CanvasState {
  editMode: EditMode;
  context: CanvasRenderingContext2D | null;
}

const initialState: CanvasState = {
  editMode: false,
  context: null,
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
    case canvasAction.setContext: {
      return {
        ...state,
        context: payload,
      };
    }
    default:
      return state;
  }
};

export default canvasReduer;
