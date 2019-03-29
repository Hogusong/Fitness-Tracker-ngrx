import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import * as rootReducer from '../../reducers/root.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authStatus$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.authStatus$ = this.store.select(rootReducer.getAuthStatus);
  }

  logout() {
    this.authService.logout();
  }
}
