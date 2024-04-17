import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { StageComponent } from './components/stage/stage.component';
import {MessageComponent} from "./components/message/message.component";
import {GetstageComponent} from "./components/stage/getstage/getstage.component";
import {ChatbotComponent} from "./components/chatbot/chatbot.component";
import {StreamlitViewerComponent} from "./components/stage/streamlit-viewer/streamlit-viewer.component";
import {AddComComponent} from "./components/Competences/add-com/add-com.component";
import {GetCompComponent} from "./components/Competences/get-comp/get-comp.component";

import {GetCompAdminComponent} from "./components/Competences/get-comp-admin/get-comp-admin.component";

import { GetPostComponent } from './components/post/get-post/get-post.component';
import { ProfileComponent } from './components/post/profile/profile.component';
import { NotificationComponent } from './components/notification/notification.component';


import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { AddTestComponent } from './components/Test/add-test/add-test.component';
import { GetTestComponent } from './components/Test/get-test/get-test.component';
import { UpdateTestComponent } from './components/Test/update-test/update-test.component';
import { TestStatComponent } from './components/Test/test-stat/test-stat.component';
import { QuizComponent } from './components/Quiz/quiz/quiz.component';
import { MatchingComponent } from './components/Competences/matching/matching.component';

import { HeaderComponent} from "./components/template/header/header.component";
import { HomeComponent} from "./components/template/home/home.component";
import { LoginComponent} from "./components/template/login/login.component";
import { EvaluationComponent } from './components/evaluation/evaluation/evaluation.component'
import { PlanningComponent } from './components/planning/planning/planning.component';
import { ShowEvaluationComponent } from './components/evaluation/show-evaluation/show-evaluation.component';
import { UpdateEvaluationComponent } from './components/evaluation/update-evaluation/update-evaluation.component';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';  // Importez le composant pour les détails de l'évaluation
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CalendarComponent } from './components/planning/calendar/calendar.component';
import { CalendarAdminComponent } from './components/planning/calendar-admin/calendar-admin.component';
import { DetailsComponent } from './components/planning/calendar/details/details.component';
import { UpdateCalendarComponent } from './components/planning/calendar/update-calendar/update-calendar.component';
import { FavorisComponent } from './components/favoris/favoris.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages/:id', component: StageComponent },
  { path: 'students/stages/:id', component: GetstageComponent },
  { path: 'messages/:id', component: MessageComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'python', component: StreamlitViewerComponent },
  { path: 'competence/add/:context/:id', component: AddComComponent },
  { path: 'competence/get/:context/:id', component: GetCompComponent },

  { path: 'getpost', component: GetPostComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'notification', component: NotificationComponent },

  { path: 'stages', component: StageComponent },
  { path: 'competence/add/:context/:id', component: AddComComponent },
  { path: 'competence/get/:context/:id', component: GetCompComponent },
  { path: 'competence/matching', component: MatchingComponent },
  { path: 'Test/add', component: AddTestComponent },
  { path: 'Test/get', component: GetTestComponent },
  { path: 'Test/update/:id', component: UpdateTestComponent },
  { path: 'Test/duration', component: TestStatComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'competence/getbyrole', component: GetCompAdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'evaluation/show-evaluation', component: ShowEvaluationComponent },
  { path: 'evaluation-details/:id', component: EvaluationDetailsComponent },
  { path: 'update/:id', component: UpdateEvaluationComponent },
  { path: 'planning/:dateStr', component: PlanningComponent },
  { path: 'details/:id', component: DetailsComponent }, // Route pour le composant details avec un paramètre id
  {path:'calendar',component:CalendarComponent},
  {path:'calendar-Admin',component:CalendarAdminComponent},
  {path:'update-calendar/:id',component:UpdateCalendarComponent},
  {path:'favoris',component:FavorisComponent},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
