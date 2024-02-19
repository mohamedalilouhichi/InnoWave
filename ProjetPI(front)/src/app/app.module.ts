import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature/list-candidature.component';
import { AjoutCandidatureComponent } from './components/candidature/ajout-candidature/ajout-candidature.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    StageComponent,
    ListCandidatureComponent,
    AjoutCandidatureComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
