import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as authReducer from './auth.reducer';
import * as trainingReducer from './training.reducer';

export interface State {
  auth: authReducer.State,
  training: trainingReducer.State
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.reducer,
  training: trainingReducer.reducer
}

const getAuthState = createFeatureSelector<authReducer.State>('auth');
export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);
export const getUser = createSelector(getAuthState, authReducer.getUser);

const getTrainingState = createFeatureSelector<trainingReducer.State>('training');
export const getAvailableTrainings = createSelector(getTrainingState, trainingReducer.getAvailableTrainings);
export const getPastTrainings = createSelector(getTrainingState, trainingReducer.getPastTrainings);
export const getRunningTraining = createSelector(getTrainingState, trainingReducer.getRunningTraining);
export const getOnTraining = createSelector(getTrainingState, trainingReducer.getOnTraining);
