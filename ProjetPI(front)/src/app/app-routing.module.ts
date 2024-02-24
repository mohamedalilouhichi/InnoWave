import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature/list-candidature.component';
import { AjoutCandidatureComponent } from './components/candidature/ajout-candidature/ajout-candidature.component';
import { ListFeedbackComponent } from './components/feedback/list-feedback/list-feedback.component';
import { AjoutFeedbackComponent } from './components/feedback/ajout-feedback/ajout-feedback.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'retrieveAllCandidatures', component: ListCandidatureComponent },
  //{ path: 'addCandidatureAndAssignToStudentAndStage', component: AjoutCandidatureComponent},
  { path: 'addCandidacy', component:AjoutCandidatureComponent},
  { path: 'getAllFeedback', component:ListFeedbackComponent},
  { path: 'addFeedback', component: AjoutFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
