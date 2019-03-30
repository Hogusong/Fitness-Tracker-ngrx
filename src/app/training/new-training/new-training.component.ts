import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from 'src/app/models';
import * as rootReducer from '../../reducers/root.reducer';
import { TrainingService } from 'src/app/providers/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>

  constructor(private trainingService: TrainingService,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.exercises$ = this.store.select(rootReducer.getAvailableTrainings);
    this.trainingService.fetchAvailableExercises();
  }

  start(exercise: Exercise) {
    this.trainingService.startTraining(exercise);
  }
}
