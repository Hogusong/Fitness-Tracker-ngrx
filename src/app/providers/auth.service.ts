import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../models';
import * as rootReducer from '../reducers/root.reducer';
import * as uiReducer from '../reducers/ui.reducer';
import * as authReducer from '../reducers/auth.reducer';
import * as traingingReducer from '../reducers/training.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User = null;
  private authStatus = new Subject<boolean>();
  private membersCollection: AngularFirestoreCollection<User>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private store: Store<rootReducer.State>,
              private router: Router) {
    this.membersCollection = this.db.collection(
      'members', ref => ref.orderBy('username', 'asc')
    );
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // this.authStatus.next(true);
        this.store.dispatch(new authReducer.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        // this.authStatus.next(false);
        this.store.dispatch(new authReducer.SetUnauthenticated());
        this.router.navigate(['/']);
      }
    })
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getUsers() {
    return this.membersCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const user = action.payload.doc.data() as User;
          user.id = action.payload.doc.id;
          return user;
        });
      }))
  }

  signup(data: any): Promise<any> {
    const newUser: User = { 
      username: data.username.toLowerCase().trim(),
      email: data.email.toLowerCase().trim()
    }
    return new Promise((res, rej) => {
      this.store.dispatch(new uiReducer.StartLoading());
      this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, data.password)
        .then(result => {
          this.membersCollection.add(newUser).then(docRef => newUser.id = docRef.id);
          this.store.dispatch(new uiReducer.StopLoading());
          res('Succeed');
        })
        .catch(error => {
          this.store.dispatch(new uiReducer.StopLoading());
          rej(error.message);
        })
      });
  }

  login(email, password): Promise<any> {
    this.store.dispatch(new uiReducer.StartLoading());
    return new Promise((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.getUsers().subscribe((users: User[]) => {
            this.user = users.find(user => user.email === email);
            this.store.dispatch(new authReducer.SetAuthenticated());
            this.store.dispatch(new authReducer.SetUser(this.user));
            this.store.dispatch(new uiReducer.StopLoading());
            res('Enjoy your fitness.');
          }, error => {
            this.store.dispatch(new uiReducer.StopLoading());
            rej('No users exist.')
          });
        })
        .catch(error => {
          this.store.dispatch(new uiReducer.StopLoading());
          rej(error.message);
        })
    })
  }

  logout() {
    this.store.dispatch(new authReducer.SetUnauthenticated());
    this.store.dispatch(new traingingReducer.SetFinishedTrainings([]));
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
