import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { StageComponent } from './components/stage/stage.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AddComComponent } from './components/Competences/add-com/add-com.component';
import { GetCompComponent } from './components/Competences/get-comp/get-comp.component';
import { NavbarComponent } from './components/Competences/navbar/navbar.component';
import { FootercompComponent } from './components/Competences/footercomp/footercomp.component';
import { UpdatecompComponent } from './components/Competences/updatecomp/updatecomp.component';
import { AddTestComponent } from './components/Test/add-test/add-test.component';
import { NavbaradminComponent } from './components/navbaradmin/navbaradmin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GetTestComponent } from './components/Test/get-test/get-test.component';
import { ModalComponent } from './components/Test/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    StageComponent,
    AddComComponent,
    GetCompComponent,
    NavbarComponent,
    FootercompComponent,
    UpdatecompComponent,
    AddTestComponent,
    NavbaradminComponent,
    SidebarComponent,
    GetTestComponent,
    ModalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule ,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
