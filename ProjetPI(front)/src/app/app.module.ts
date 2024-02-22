import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { UpdatePostComponent } from './components/post/update-post/update-post.component';
import { GetPostComponent } from './components/post/get-post/get-post.component';
import { ProfileComponent } from './components/post/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    UpdatePostComponent,
    GetPostComponent,
    ProfileComponent 
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
