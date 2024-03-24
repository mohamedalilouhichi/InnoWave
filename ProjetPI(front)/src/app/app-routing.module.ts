import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import {MessageComponent} from "./components/message/message.component";
import {GetstageComponent} from "./components/stage/getstage/getstage.component";
import {ChatbotComponent} from "./components/chatbot/chatbot.component";
import {StreamlitViewerComponent} from "./components/stage/streamlit-viewer/streamlit-viewer.component";
import {ChatComponent} from "./components/chat/chat.component";

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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
