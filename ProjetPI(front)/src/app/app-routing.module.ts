import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/template/home/home.component";
import { LoginComponent } from "./components/template/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import {MessageComponent} from "./components/message/message.component";
import {GetstageComponent} from "./components/stage/getstage/getstage.component";
import {ChatbotComponent} from "./components/chatbot/chatbot.component";
import {StreamlitViewerComponent} from "./components/stage/streamlit-viewer/streamlit-viewer.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AddComComponent} from "./components/Competences/add-com/add-com.component";
import {GetCompComponent} from "./components/Competences/get-comp/get-comp.component";

import {GetCompAdminComponent} from "./components/Competences/get-comp-admin/get-comp-admin.component";

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
  { path: 'chat/:id', component: ChatComponent },

  { path: 'competence/add/:context/:id', component: AddComComponent },
  { path: 'competence/get/:context/:id', component: GetCompComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
