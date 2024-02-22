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
import { UpdatePlanningComponent } from './components/planning/update-planning/update-planning.component';
import { ShowPlanningComponent } from './components/planning/show-planning/show-planning.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'update/:id', component: UpdateEvaluationComponent },
  { path: 'evaluation/show-evaluation', component: ShowEvaluationComponent }, // Mettez le chemin complet ici
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'planning', component: PlanningComponent },
  {path:'updatePlan/:id',component:UpdatePlanningComponent},
  {path:'planning/show-planning',component:ShowPlanningComponent},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
