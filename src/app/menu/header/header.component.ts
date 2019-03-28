import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatus = false;
  @Output('onToggle') onToggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.authStatus = true;
  }

  logout() {
    this.authStatus = false;
  }
}
