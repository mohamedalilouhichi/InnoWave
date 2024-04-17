import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import { AddDocComponent } from './components/document/add-doc/add-doc.component';
import { ListDocComponent } from './components/document/list-doc/list-doc.component';
import { EditDocumentComponent } from './components/document/edit-document/edit-document.component';
import { DetailDocumentComponent } from './components/document/detail-document/detail-document.component';
import { CertificatComponent } from './components/document/certificat/certificat.component';
import { AddDocAdminComponent } from './components/document/add-doc-admin/add-doc-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'stages', component: StageComponent },
  { path: 'view-doc', component: ListDocComponent },
  { path: 'listDoc', component: ListDocComponent },
  { path: 'addDocAdmin', component: AddDocAdminComponent },
  { path: 'add-doc', component: AddDocComponent },
  { path: 'editDoc/:idDocuments', component: EditDocumentComponent },
  { path: 'detailDoc/:idDocuments', component: DetailDocumentComponent },
  { path: 'certif', component: CertificatComponent },
  // Redirige toutes les URL inconnues vers NotFoundComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
