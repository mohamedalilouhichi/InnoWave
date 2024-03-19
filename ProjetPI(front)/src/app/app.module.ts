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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessageComponent } from './components/message/message.component';
import { StagebyidComponent } from './components/stage/getstagebyid/stagebyid.component';
import { GetstageComponent } from './components/stage/getstage/getstage.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { StreamlitViewerComponent } from './components/stage/streamlit-viewer/streamlit-viewer.component';
import { ChatComponent } from './components/chat/chat.component';

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
    StagebyidComponent,
    GetstageComponent,
    ChatbotComponent,
    StreamlitViewerComponent,
    ChatComponent,


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
