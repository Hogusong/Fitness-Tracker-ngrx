import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import * as rootReducer from '../../reducers/root.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;
  errMessage = '';
  constructor(private authService: AuthService,
              private store: Store<rootReducer.State>,
              private router: Router) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(rootReducer.getIsLoading);
  }

  onSubmit(form: NgForm) {
    let email = form.value.email.toLowerCase().trim();
    const password = form.value.password;
    if (form.valid) {
      this.authService.login(email, password)
        .then(() => {
          this.router.navigate(['/training'])
        })
        .catch(message => {
          this.errMessage = message
        });
    }
  }
}
