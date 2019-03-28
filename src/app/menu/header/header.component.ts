import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authStatus: boolean;
  subscription: Subscription;
  @Output('onToggle') onToggle = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getAuthStatus()
      .subscribe(res => this.authStatus = res)
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
