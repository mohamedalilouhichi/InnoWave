import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import {MessageComponent} from "./components/message/message.component";
import {GetstageComponent} from "./components/stage/getstage/getstage.component";
import {StagebyidComponent} from "./components/stage/getstagebyid/stagebyid.component";

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages/:id', component: StageComponent },
  { path: 'students/stages', component: GetstageComponent },
  { path: 'students/stages/:id', component: StagebyidComponent },
  { path: 'messages', component: MessageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
