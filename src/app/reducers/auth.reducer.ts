import { Action } from '@ngrx/store';
import { User } from '../models';

export interface State {
  authStatus: boolean;
  user: User
}

const SET_AUTHENTICATED = '[Auth] Set Authenticated';
const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
const SET_USER = '[Auth] Set User';
const REMOVE_USER = '[Auth] Remove User';

const initialState: State = {
  authStatus: false,
  user: null
}

export function reducer(state=initialState, action: authAction) {
  switch (action.type) {
    case SET_AUTHENTICATED :
      state.authStatus = true;
      break;
    case SET_UNAUTHENTICATED :
      state.authStatus = false;
      break;
    case SET_USER :
      state.user = action.payload;
      break;
    case REMOVE_USER :
      state.user = null;
  }
  return state;
}

export const getAuthStatus = (state: State) => state.authStatus;
export const getUser = (state: State) => state.user;

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) {}
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
}

type authAction = SetAuthenticated | SetUnauthenticated | SetUser | RemoveUser;