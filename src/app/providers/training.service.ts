import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
}
