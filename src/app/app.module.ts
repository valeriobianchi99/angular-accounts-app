import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountcontrolService } from './services/accountcontrol.service';
import { ManageService } from './services/manage.service';
import { UtentiComponent } from './utenti/utenti.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeindexComponent } from './homeindex/homeindex.component';
import { UpdateComponent } from './update/update.component';
import { ArticoloComponent } from './articolo/articolo.component';
import { ToastService } from './services/toast.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    UtentiComponent,
    CatalogoComponent,
    HomeindexComponent,
    UpdateComponent,
    ArticoloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  // Services
  providers: [AccountcontrolService, ManageService, AccountcontrolService, ToastService],
  // First component 
  bootstrap: [AppComponent]
})

export class AppModule { }
