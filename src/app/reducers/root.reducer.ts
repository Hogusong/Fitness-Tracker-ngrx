import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as authReducer from './auth.reducer';

export interface State {
  auth: authReducer.State
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.reducer
}

const getAuthState = createFeatureSelector<authReducer.State>('auth');
export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);
export const getUser = createSelector(getAuthState, authReducer.getUser);
