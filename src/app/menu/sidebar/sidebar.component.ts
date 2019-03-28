import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authStatus = false;

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
