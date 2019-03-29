import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/providers/auth.service';
import * as rootReducer from '../../reducers/root.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatus: boolean;
  authStatus$: Observable<boolean>;
  @Output('onToggle') onToggle = new EventEmitter();

  constructor(private authService: AuthService,
              private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.store.select(rootReducer.getAuthStatus).subscribe(res => this.authStatus = res)
  }

  logout() {
    this.authService.logout();
  }
}
