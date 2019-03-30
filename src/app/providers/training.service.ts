import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { Exercise } from '../models';
import * as rootReducer from '../reducers/root.reducer';
import * as trainingReducer from '../reducers/training.reducer';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableCollection: AngularFirestoreCollection<Exercise>;
  private historyCollection: AngularFirestoreCollection<Exercise>;

  constructor(private db: AngularFirestore,
              private store: Store<rootReducer.State>) {
    this.availableCollection = this.db.collection(
      'availableExercises', ref => ref.orderBy('name', 'asc')
    )
  }

  fetchAvailableExercises() {
    this.availableCollection.snapshotChanges().pipe(map(res => {
      return res.map(action => {
        const data = action.payload.doc.data() as Exercise;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
    .subscribe(exercises => {
      this.store.dispatch(new trainingReducer.SetAvailableTrainings(exercises));
    }, error => console.log('Firebase is disconnected now!'))
  }

  fetchPastExercises() {
    this.store.select(rootReducer.getUser).subscribe(user => {
      this.historyCollection = this.db.collection(
        'pastExercises', ref => ref.where('userID', '==', user.id));
      this.historyCollection.snapshotChanges().pipe(map(res => {
        return res.map(action => {
          const data = action.payload.doc.data() as Exercise;
          return data;
        })
      }))
      .subscribe(exercises => {
        console.log(exercises);
        this.store.dispatch(new trainingReducer.SetFinishedTrainings(exercises))
      }, error => console.log('Failure fetching for Past Exercises.'))
    })
  }

  startTraining(exercise: Exercise) {
    this.store.dispatch(new trainingReducer.StartTraining(exercise));
  }

  completeExercise() {
    this.store.select(rootReducer.getRunningTraining).pipe(take(1))
      .subscribe(exercise => {
        exercise = {
          ...exercise,
          date: (new Date()).toISOString(),
          state: 'completed'
        }
        this.saveExerciseInHistory(exercise);
      })
  }

  saveExerciseInHistory(exercise: Exercise) {
    this.store.select(rootReducer.getUser).pipe(take(1))
      .subscribe(user => {
        exercise.userID = user ? user.id : '';
        console.log(user)
        this.db.collection('pastExercises').add(exercise)
          .catch(error => {
          });
      })
    this.store.dispatch(new trainingReducer.StopTraining());
  }

  stopExercise(process: number) {
    this.store.select(rootReducer.getRunningTraining).pipe(take(1))
      .subscribe(exercise => {
        const duration = exercise.duration * (process / 100);
        const calories = exercise.calories * (process / 100);
        exercise = {
          ...exercise,
          duration: +duration.toFixed(2),
          calories: +calories.toFixed(2),
          date: (new Date()).toISOString(),
          state: 'cancelled'
        }
        this.saveExerciseInHistory(exercise);
      })
  }
}
