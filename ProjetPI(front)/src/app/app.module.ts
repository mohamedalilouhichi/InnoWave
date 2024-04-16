import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { HomeComponent } from './components/template/home/home.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/template/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageComponent } from './components/message/message.component';
import {GetstageComponent, TimeAgoPipe} from './components/stage/getstage/getstage.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { StreamlitViewerComponent } from './components/stage/streamlit-viewer/streamlit-viewer.component';
import { ChatComponent } from './components/chat/chat.component';
import {GetCompComponent} from "./components/Competences/get-comp/get-comp.component";
import {NavbarComponent} from "./components/Competences/navbar/navbar.component";

import {AddComComponent} from "./components/Competences/add-com/add-com.component";
import {FootercompComponent} from "./components/Competences/footercomp/footercomp.component";
import {UpdatecompComponent} from "./components/Competences/updatecomp/updatecomp.component";

import {GetCompAdminComponent} from "./components/Competences/get-comp-admin/get-comp-admin.component";
import {CardComponent} from "./components/Competences/card/card.component";

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
    ChatComponent,
    AddComComponent,
    GetCompComponent,
    NavbarComponent,
    FootercompComponent,
    UpdatecompComponent,
    GetCompAdminComponent,
    CardComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent,StreamlitViewerComponent]
})
export class AppModule { }
