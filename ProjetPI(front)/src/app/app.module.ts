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
import { UpdatePlanningComponent } from './components/planning/update-planning/update-planning.component';
import { ShowPlanningComponent } from './components/planning/show-planning/show-planning.component';
import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { ChartModule } from 'angular-highcharts';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';
import { StarComponent } from './components/star/star.component';

 
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
    UpdatePlanningComponent,
    ShowPlanningComponent,
    NavbaradminComponent,
    EvaluationDetailsComponent,
    StarComponent,
  
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule,ChartModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
