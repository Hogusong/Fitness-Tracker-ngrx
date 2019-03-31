import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as uiReducer from './ui.reducer';
import * as authReducer from './auth.reducer';
import * as trainingReducer from './training.reducer';

export interface State {
  ui: uiReducer.State,
  auth: authReducer.State,
  training: trainingReducer.State
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer.reducer,
  auth: authReducer.reducer,
  training: trainingReducer.reducer
}

const getUIState = createFeatureSelector<uiReducer.State>('ui');
export const getIsLoading = createSelector(getUIState, uiReducer.getIsLoading);

const getAuthState = createFeatureSelector<authReducer.State>('auth');
export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);
export const getUser = createSelector(getAuthState, authReducer.getUser);

const getTrainingState = createFeatureSelector<trainingReducer.State>('training');
export const getAvailableTrainings = createSelector(getTrainingState, trainingReducer.getAvailableTrainings);
export const getPastTrainings = createSelector(getTrainingState, trainingReducer.getPastTrainings);
export const getRunningTraining = createSelector(getTrainingState, trainingReducer.getRunningTraining);
export const getOnTraining = createSelector(getTrainingState, trainingReducer.getOnTraining);
