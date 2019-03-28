import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User = null;
  private users: User[] = null;
  private authStatus = new Subject<boolean>();
  private membersCollection: AngularFirestoreCollection<User>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {
    this.membersCollection = this.db.collection(
      'members', ref => ref.orderBy('username', 'asc')
    );
  }

  initAuthListener() {
    this.getUsers();
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

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getUsers() {
    this.membersCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const user = action.payload.doc.data() as User;
          user.id = action.payload.doc.id;
          return user;
        });
      }))
      .subscribe((users: User[]) => this.users = users);
  }

  getEmail(username) {
    const user = this.users.find(user => user.username === username);
    return user ? user.email : null;
  }

  signup(data: any): Promise<any> {
    const newUser: User = { 
      username: data.username.toLowerCase().trim(),
      email: data.email.toLowerCase().trim() }
    if (this.users.find(user => user.username === newUser.username)) {
      return new Promise((res, rej) => rej('The username is already in use by another account.'));
    }
    return new Promise((res, rej) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, data.password)
        .then(result => {
          this.membersCollection.add(newUser).then(docRef => newUser.id = docRef.id);
          console.log(newUser);
          res('Succeed');
        })
        .catch(error => {
          rej(error.message);
        })
      });
  }

  login(email, password): Promise<any> {
    return new Promise((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.user = this.users.find(user => user.email = email);
          this.authStatus.next(true);
          res('Enjoy your fitness.');
        })
        .catch(error => {
          this.authStatus.next(false);
          rej(error.message);
        })
    })
  }

  logout() {
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }
}
