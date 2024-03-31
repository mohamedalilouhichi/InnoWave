import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component'; 
import { EvaluationComponent } from './components/evaluation/evaluation/evaluation.component'
import { PlanningComponent } from './components/planning/planning/planning.component';
import { ShowEvaluationComponent } from './components/evaluation/show-evaluation/show-evaluation.component';
import { UpdateEvaluationComponent } from './components/evaluation/update-evaluation/update-evaluation.component';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';  // Importez le composant pour les détails de l'évaluation
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CalendarComponent } from './components/planning/calendar/calendar.component'; 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'evaluation/show-evaluation', component: ShowEvaluationComponent },
  { path: 'evaluation-details/:id', component: EvaluationDetailsComponent },
  { path: 'update/:id', component: UpdateEvaluationComponent },
  { path: 'planning', component: PlanningComponent },
  {path:'calendar',component:CalendarComponent},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
