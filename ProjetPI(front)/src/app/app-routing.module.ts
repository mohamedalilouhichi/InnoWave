import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { StageComponent } from './components/stage/stage.component';
import { AddComComponent } from './components/Competences/add-com/add-com.component';
import { GetCompComponent } from './components/Competences/get-comp/get-comp.component';
import { UpdatecompComponent } from './components/Competences/updatecomp/updatecomp.component';
import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { AddTestComponent } from './components/Test/add-test/add-test.component';
import { GetTestComponent } from './components/Test/get-test/get-test.component';
import { UpdateTestComponent } from './components/Test/update-test/update-test.component';
import { TestStatComponent } from './components/Test/test-stat/test-stat.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'competence/add/:id', component: AddComComponent },
  { path: 'competence/get', component: GetCompComponent },
  { path: 'competence/update/:id', component: UpdatecompComponent },
  { path: 'Test/add', component: AddTestComponent },
  { path: 'Test/get', component: GetTestComponent },
  { path: 'Test/update/:id', component: UpdateTestComponent },
  { path: 'Test/duration', component: TestStatComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
  
})
export class AppRoutingModule { }
