import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import { AddComComponent } from './components/Competences/add-com/add-com.component';
import { GetCompComponent } from './components/Competences/get-comp/get-comp.component';
import { UpdatecompComponent } from './components/Competences/updatecomp/updatecomp.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'competence/add', component: AddComComponent },
  { path: 'competence/get', component: GetCompComponent },
  { path: 'competence/update', component: UpdatecompComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
