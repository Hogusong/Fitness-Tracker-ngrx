import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  notMatched = false;
  errMessage = '';
  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.notMatched = false;
    if (form.valid) {
      if (form.value.password != form.value.confirmPW) {
        this.notMatched = true;
        setTimeout(() => this.notMatched = false, 3000)
      } else {
        this.isLoading = true;
        setTimeout(() => this.isLoading = false, 3000)
      }
    }
  }
}
