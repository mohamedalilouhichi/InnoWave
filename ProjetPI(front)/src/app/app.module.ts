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
import {ReactiveFormsModule} from "@angular/forms";

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


import {FormsModule} from "@angular/forms";
import { EvaluationComponent } from './components/evaluation/evaluation/evaluation.component';
import { PlanningComponent } from './components/planning/planning/planning.component';
import { ShowEvaluationComponent } from './components/evaluation/show-evaluation/show-evaluation.component';
import { UpdateEvaluationComponent } from './components/evaluation/update-evaluation/update-evaluation.component';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';
import { StarComponent } from './components/star/star.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/planning/calendar/calendar.component';
import { DetailsComponent } from './components/planning/calendar/details/details.component';
import { CalendarAdminComponent } from './components/planning/calendar-admin/calendar-admin.component';
import { UpdateCalendarComponent } from './components/planning/calendar/update-calendar/update-calendar.component';
import { FavorisComponent } from './components/favoris/favoris.component'



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


    EvaluationComponent,
    PlanningComponent,
    ShowEvaluationComponent,
    UpdateEvaluationComponent,

    NavbaradminComponent,
    EvaluationDetailsComponent,
    StarComponent,
    CalendarComponent,
    DetailsComponent,
    CalendarAdminComponent,
    UpdateCalendarComponent,
    FavorisComponent,


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
    ReactiveFormsModule,

    FormsModule, FullCalendarModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
