import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountcontrolService } from '../services/accountcontrol.service';
import { ManageService } from '../services/manage.service';
import { User } from '../user.model';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // Properties
  utente: FormGroup;
  alert = false;

  constructor(private formsBuilder: FormBuilder, private router: Router, private controller: AccountcontrolService, private accService: ManageService, private tServ: ToastService) {
    // Creating object linked to the form
    this.utente = this.formsBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit() {
    console.clear();
    console.log("Welcome!");
    console.log("Please, login with your username and password.");
  }

  // Login method
  login(): void {
    // Success login
    if (localStorage.getItem('users') && this.controller.userControl(this.utente.get('username').value, this.utente.get('password').value)) {
      this.router.navigate(['app-index/home']);
      var c: User = JSON.parse(localStorage.getItem('users')).find(el => this.utente.get('username').value === el.username);
      this.accService.setProfile(c);
    }
    // Error
    else {
      this.tServ.setValues('Username o password errati!', 'error');
    }
  }

}
