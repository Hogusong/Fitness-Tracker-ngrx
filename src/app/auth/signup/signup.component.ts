import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import * as rootReducer from '../../reducers/root.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  notMatched = false;
  errMessage = '';
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<rootReducer.State>,
              private router: Router) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(rootReducer.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.notMatched = false;
    if (form.valid) {
      if (form.value.password != form.value.confirmPW) {
        this.notMatched = true;
        setTimeout(() => this.notMatched = false, 3000)
      } else {
        this.authService.signup(form.value)
          .then(res => {
            this.router.navigate(['/login']);
          })
          .catch(message => {
            this.errMessage = message;
          });
      }
    }
  }
}
