import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { WelcomeComponent } from "./menu/welcome/welcome.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'training', loadChildren: './training/training.module#TrainingModule' }
]
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {}