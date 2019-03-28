import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errMessage = '';
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let email = form.value.keyword.toLowerCase().trim();
    const password = form.value.password;
    if (form.valid) {
      if (!email.includes('@')) {
        email = this.authService.getEmail(email);
      }
      if (email) {
        this.isLoading = true;
        this.authService.login(email, password)
          .then(() => {
            this.isLoading = false;
            this.router.navigate(['/training'])
          })
          .catch(message => {
            this.isLoading = false;
            this.errMessage = message
          });
      } else {
        this.errMessage = 'Not found username. Try another.'
      }
    }
  }
}
