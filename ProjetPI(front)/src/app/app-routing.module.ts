import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AddRecComponent } from './components/Reclamation/add-rec/add-rec.component';
import { GuardGuard } from './components/login/guard.guard';
import { RegisterComponent } from './components/register/register.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { ReclamationComponent } from './admin/reclamation/reclamation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',canActivate:[GuardGuard], component: HomeComponent },
  { path: 'admin',canActivate:[GuardGuard], component: AdminComponent },
  { path: 'admin/utilisateur',canActivate:[GuardGuard], component: UtilisateurComponent },
  { path: 'admin/reclamation',canActivate:[GuardGuard], component: ReclamationComponent },
  {path: 'Reclamation/add-rec', component: AddRecComponent},
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
