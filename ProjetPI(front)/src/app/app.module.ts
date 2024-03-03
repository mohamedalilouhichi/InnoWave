import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature/list-candidature.component';
import { AjoutCandidatureComponent } from './components/candidature/ajout-candidature/ajout-candidature.component';
import { ListFeedbackComponent } from './components/feedback/list-feedback/list-feedback.component';
import { AjoutFeedbackComponent } from './components/feedback/ajout-feedback/ajout-feedback.component';
import { ListFeedbackFrontComponent } from './components/feedback/list-feedback-front/list-feedback-front.component';
import { ListCandidatureFrontComponent } from './components/candidature/list-candidature-front/list-candidature-front.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddFeedbackBackOfficeComponent } from './components/feedback/add-feedback-back-office/add-feedback-back-office.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    ListCandidatureComponent,
    AjoutCandidatureComponent,
    ListFeedbackComponent,
    AjoutFeedbackComponent,
    ListFeedbackFrontComponent,
    ListCandidatureFrontComponent,
    ProfilComponent,
    AddFeedbackBackOfficeComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    
 
  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
