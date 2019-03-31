import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { CommonModule } from "@angular/common";
import { ShareModule } from "../share/share.module";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class AuthModule {}