import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard-service.service';
import { UtentiComponent } from './utenti/utenti.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HomeindexComponent } from './homeindex/homeindex.component';
import { UpdateComponent } from './update/update.component';
import { ArticoloComponent } from './articolo/articolo.component';

// Routes
const routes: Routes = [
  {path: 'app-register', component: RegisterComponent },
  {path: 'app-login', component: LoginComponent },
  // Index (after login)
  {path: 'app-index', component: HomeindexComponent, canActivate : [AuthGuardService],
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'utenti', component: UtentiComponent },
      {path: 'catalogo', component: CatalogoComponent},
      {path: 'newproduct', component: ArticoloComponent},
      //Takes id param
      {path: 'articolo/:id', component: ArticoloComponent},
      {path: 'update', component: UpdateComponent}
    ]
  },
  // else
  {path: '', redirectTo: 'app-login', pathMatch: 'full'},
  {path: '**', redirectTo: 'app-login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
