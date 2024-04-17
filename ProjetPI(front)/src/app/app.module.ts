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
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AddTestComponent } from './components/Test/add-test/add-test.component';
import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GetTestComponent } from './components/Test/get-test/get-test.component';
import { UpdateTestComponent } from './components/Test/update-test/update-test.component';
import { TestStatComponent } from './components/Test/test-stat/test-stat.component';
import { QuizComponent } from './components/Quiz/quiz/quiz.component';
import { FormatTimePipe } from './format-time.pipe';
import { MatchingComponent } from './components/Competences/matching/matching.component';
import { PopUpCompComponent } from './components/Competences/pop-up-comp/pop-up-comp.component';





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
    MatchingComponent,
    AddTestComponent,
    NavbaradminComponent,
    SidebarComponent,
    GetTestComponent,
    UpdateTestComponent,
    TestStatComponent,
    QuizComponent,
    FormatTimePipe,
    GetCompAdminComponent,
    CardComponent,
    PopUpCompComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule ,
    FormsModule ,
    ReactiveFormsModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
