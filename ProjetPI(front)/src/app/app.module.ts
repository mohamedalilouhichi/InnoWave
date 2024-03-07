import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Combine Angular forms imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { GetPostComponent } from './components/post/get-post/get-post.component';
import { ProfileComponent } from './components/post/profile/profile.component';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    GetPostComponent,
    ProfileComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,   
    ReactiveFormsModule,
    NgbModule, 

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
