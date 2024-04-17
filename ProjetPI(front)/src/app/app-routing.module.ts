import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AddRecComponent } from './components/Reclamation/add-rec/add-rec.component';
import { GuardGuard } from './components/login/guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',canActivate:[GuardGuard], component: HomeComponent },
  { path: 'admin',canActivate:[GuardGuard], component: AdminComponent },
  {path: 'Reclamation/add-rec', component: AddRecComponent},
  { path: 'register', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
