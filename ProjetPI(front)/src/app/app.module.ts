// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/header/header.component';
// import { HomeComponent } from './components/home/home.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { AdminComponent } from './admin/admin.component';
// import { LoginComponent } from './components/login/login.component';
// import { StageComponent } from './components/stage/stage.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AddDocComponent } from './components/document/add-doc/add-doc.component';
// import { ListDocComponent } from './components/document/list-doc/list-doc.component';
// import { DetailDocumentComponent } from './components/document/detail-document/detail-document.component';
// import { EditDocumentComponent } from './components/document/edit-document/edit-document.component';
// import { CertificatComponent } from './components/document/certificat/certificat.component';
// import { AddDocAdminComponent } from './components/document/add-doc-admin/add-doc-admin.component';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     HomeComponent,
//     FooterComponent,
//     AdminComponent,
//     LoginComponent,
//     StageComponent,
//     AddDocComponent,
//     ListDocComponent,
//     DetailDocumentComponent,
//     EditDocumentComponent,
//     CertificatComponent,
//     AddDocAdminComponent,
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: HttpLoaderFactory,
//         deps: [HttpClient]
//       }
//     })
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importez HttpClientModule et HttpClient d'ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDocComponent } from './components/document/add-doc/add-doc.component';
import { ListDocComponent } from './components/document/list-doc/list-doc.component';
import { DetailDocumentComponent } from './components/document/detail-document/detail-document.component';
import { EditDocumentComponent } from './components/document/edit-document/edit-document.component';
import { CertificatComponent } from './components/document/certificat/certificat.component';
import { AddDocAdminComponent } from './components/document/add-doc-admin/add-doc-admin.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    StageComponent,
    AddDocComponent,
    ListDocComponent,
    DetailDocumentComponent,
    EditDocumentComponent,
    CertificatComponent,
    AddDocAdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Importez HttpClientModule ici une seule fois
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en'
  })

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
