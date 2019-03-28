import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = null;
  authStatus = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authStatus.next(true);
        console.log('Logged in successfully!!!')
        this.router.navigate(['/']);
      } else {
        this.authStatus.next(false);
        this.router.navigate(['/signup']);
        console.log('Please Log in to use this app!!!')
      }
    })
  }

  signup() {

  }

  login() {

  }

  logout() {

  }
}
