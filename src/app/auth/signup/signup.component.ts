import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  notMatched = false;
  errMessage = '';
  isLoading = false;

  constructor(private authService: AuthService,
              private router: Router) { }

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
        this.authService.signup(form.value)
          .then(res => {
            this.isLoading = false;
            this.router.navigate(['/login']);
          })
          .catch(message => {
            this.isLoading = false;
            this.errMessage = message;
          });
      }
    }
  }
}
