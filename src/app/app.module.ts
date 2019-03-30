import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { WelcomeComponent } from './menu/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { TrainingComponent } from './training/training.component';
import { reducers } from './reducers/root.reducer';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { CurrTrainingComponent } from './training/curr-training/curr-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { ChoiceDialogComponent } from './share/choice-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidebarComponent,
    WelcomeComponent,
    TrainingComponent,
    NewTrainingComponent,
    CurrTrainingComponent,
    PastTrainingComponent,
    ChoiceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ChoiceDialogComponent]
})
export class AppModule { }
