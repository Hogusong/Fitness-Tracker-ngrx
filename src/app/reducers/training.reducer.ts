import { Action } from '@ngrx/store';
import { Exercise } from '../models';

const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
const SET_HISTORY_TRAININGS = '[Training] Set Finished Trainings';
const START_TRAINING = '[Training] Start Training';
const STOP_TRAINING = '[Training] Stop Training'; 

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_HISTORY_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: Exercise) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING
}

type trainingAction =
    SetAvailableTrainings |
    SetFinishedTrainings |
    StartTraining |
    StopTraining;

export interface State {
  availableExercises: Exercise[];
  historyExercises: Exercise[];
  runningExercise: Exercise
}

const initialState: State = {
  availableExercises: [],
  historyExercises: [],
  runningExercise: null
}

export function reducer(state=initialState, action: trainingAction) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      state.availableExercises = action.payload;
      break;
    case SET_HISTORY_TRAININGS:
      state.historyExercises = action.payload;
      break;
    case START_TRAINING:
      state.runningExercise = action.payload;
      break;
    case STOP_TRAINING:
      state.runningExercise = null;
  }
  return { ...state };
}

export const getAvailableTrainings = (state: State) => state.availableExercises.slice();
export const getPastTrainings = (state: State) => state.historyExercises.slice();
export const getRunningTraining = (state: State) => {
  return { ...state.runningExercise }
};
export const getOnTraining = (state: State) => state.runningExercise != null;
