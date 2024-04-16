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
import { EvaluationComponent } from './components/evaluation/evaluation/evaluation.component';
import { PlanningComponent } from './components/planning/planning/planning.component';
import { ShowEvaluationComponent } from './components/evaluation/show-evaluation/show-evaluation.component';
import { UpdateEvaluationComponent } from './components/evaluation/update-evaluation/update-evaluation.component';
import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';
import { StarComponent } from './components/star/star.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // import the FullCalendar module
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
    AppRoutingModule ,
    FormsModule, FullCalendarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
