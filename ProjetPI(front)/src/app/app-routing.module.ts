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
import { HomeComponent} from "./components/template/home/home.component";
import { LoginComponent} from "./components/template/login/login.component";
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

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
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
  { path: 'competence/getbyrole', component: GetCompAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
