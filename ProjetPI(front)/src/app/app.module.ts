import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './components/template/home/home.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/template/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import { HttpClientModule } from "@angular/common/http";
import { MessageComponent } from './components/message/message.component';
import { GetstageComponent, TimeAgoPipe } from './components/stage/getstage/getstage.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { StreamlitViewerComponent } from './components/stage/streamlit-viewer/streamlit-viewer.component';
import { GetCompComponent } from "./components/Competences/get-comp/get-comp.component";
import { NavbarComponent } from "./components/Competences/navbar/navbar.component";
import { AddComComponent } from "./components/Competences/add-com/add-com.component";
import { FootercompComponent } from "./components/Competences/footercomp/footercomp.component";
import { UpdatecompComponent } from "./components/Competences/updatecomp/updatecomp.component";
import { GetCompAdminComponent } from "./components/Competences/get-comp-admin/get-comp-admin.component";
import { CardComponent } from "./components/Competences/card/card.component";
import { GetPostComponent } from './components/post/get-post/get-post.component';
import { ProfileComponent } from './components/post/profile/profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    StageComponent,
    MessageComponent,
    GetstageComponent,
    ChatbotComponent,
    StreamlitViewerComponent,
    AddComComponent,
    GetCompComponent,
    NavbarComponent,
    FootercompComponent,
    UpdatecompComponent,
    GetCompAdminComponent,
    CardComponent,
    TimeAgoPipe,
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
