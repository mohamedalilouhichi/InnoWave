import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import { AddDocComponent } from './components/document/add-doc/add-doc.component';
import { ListDocComponent } from './components/document/list-doc/list-doc.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'view-doc', component: ListDocComponent },  
  { path: 'add-doc', component: AddDocComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
