import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import { GetPostComponent } from './components/post/get-post/get-post.component';
import { GetOnepostComponent } from './components/post/get-onepost/get-onepost.component';
import { AddPostComponent } from './components/post/add-post/add-post.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'getpost', component: GetPostComponent },
  { path: 'getonepost', component: GetOnepostComponent }, 
  { path: 'addpost', component: AddPostComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
