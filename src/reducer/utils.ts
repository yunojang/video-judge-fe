export enum PromiseState {
  Pending = '_PENDING',
  Fulfiled = '_FULFILLED',
  Reject = '_REJECTED',
}

export const makePromiseActionType = (action: string, promise: PromiseState) =>
  action + promise;

export const request = (action: string) =>
  makePromiseActionType(action, PromiseState.Pending);

export const success = (action: string) =>
  makePromiseActionType(action, PromiseState.Fulfiled);

export const reject = (action: string) =>
  makePromiseActionType(action, PromiseState.Reject);

export const makeActionFunction = (name: string) => (action: string) =>
  `${name}/${action}`;
