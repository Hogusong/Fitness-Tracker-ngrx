import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as rootReducer from '../reducers/root.reducer';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onTraining$: Observable<boolean>;

  constructor(private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.onTraining$ = this.store.select(rootReducer.getOnTraining);
  }
}
