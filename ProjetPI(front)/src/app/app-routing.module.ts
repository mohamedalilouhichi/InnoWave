import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature/list-candidature.component';
import { AjoutCandidatureComponent } from './components/candidature/ajout-candidature/ajout-candidature.component';
import { ListFeedbackComponent } from './components/feedback/list-feedback/list-feedback.component';
import { AjoutFeedbackComponent } from './components/feedback/ajout-feedback/ajout-feedback.component';
import { ListFeedbackFrontComponent } from './components/feedback/list-feedback-front/list-feedback-front.component';
import { ListCandidatureFrontComponent } from './components/candidature/list-candidature-front/list-candidature-front.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddFeedbackBackOfficeComponent } from './components/feedback/add-feedback-back-office/add-feedback-back-office.component';
import { BarchartComponent } from './components/candidature/barchart/barchart.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent ,children:[
    { path: 'list', component: ListCandidatureComponent },
    { path: 'feedback', component: ListFeedbackComponent },
  ] },

  { path: 'profil', component: ProfilComponent ,children:[
    { path: 'retrieveMyCandidacy', component:ListCandidatureFrontComponent},
    { path: 'retrieveMyFeedback', component:ListFeedbackComponent},
    { path: 'addMyFeedback', component:AddFeedbackBackOfficeComponent},
    { path: 'barchart', component:BarchartComponent},
  ]
},


  { path: 'retrieveAllCandidatures', component: ListCandidatureComponent },
 // { path: 'retrieveMyCandidacy', component: ListCandidatureFrontComponent },
  { path: 'addCandidacy/:id', component:AjoutCandidatureComponent},
  //{ path: 'addCandidatureAndAssignToStudentAndStage', component: AjoutCandidatureComponent},
  { path: 'addCandidacy', component:AjoutCandidatureComponent},
  { path: 'getAllFeedback', component:ListFeedbackFrontComponent},
  { path: 'addFeedback', component: AjoutFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
