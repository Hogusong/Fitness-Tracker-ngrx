import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { WelcomeComponent } from './menu/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './reducers/root.reducer';
import { ChoiceDialogComponent } from './share/choice-dialog.component';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { SharedModule } from './share/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    WelcomeComponent,
    ChoiceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ChoiceDialogComponent]
})
export class AppModule { }
