import { Action } from '@ngrx/store';

export interface State {
  isLoading: boolean
}

const START_LOADING = '[ui] Start Loading';
const STOP_LOADING = '[ui] Stop Loading';

const initialState: State = { isLoading: false }

export function reducer(state = initialState, action: uiAction) {
  switch (action.type) {
    case START_LOADING:
      state.isLoading = true;
      break;
    case STOP_LOADING:
      state.isLoading = false;
      break;
  }
  return { ...state };
}

export const getIsLoading = (state: State) => state.isLoading;

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

type uiAction = StartLoading | StopLoading;
