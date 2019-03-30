import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from 'src/app/models';
import * as rootReducer from '../../reducers/root.reducer';
import { TrainingService } from 'src/app/providers/training.service';

@Component({
  selector: 'app-curr-training',
  templateUrl: './curr-training.component.html',
  styleUrls: ['./curr-training.component.css']
})
export class CurrTrainingComponent implements OnInit, OnDestroy {

  startedExercise: Exercise;
  subscription: Subscription;
  timer: any;
  progress = 0;
  processTime = 0;

  constructor(private store: Store<rootReducer.State>,
              private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.store.select(rootReducer.getRunningTraining).pipe(take(1))
      .subscribe((exercise: Exercise) => {
        this.startedExercise = exercise;
        this.startOrRecumeTimer();
      });
  }

  startOrRecumeTimer() {
    this.timer = setInterval(() => {
      const duration = this.startedExercise.duration;
      this.processTime++;
      this.progress = Math.round(100 * this.processTime / duration);
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, 100)
  }

  onStop() {
    this.trainingService.stopExercise(this.progress);
    clearInterval(this.timer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
