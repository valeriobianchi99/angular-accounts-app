import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from '../services/manage.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  // Properties
  @Input() user: User = new User();
  @Output() onUpdate = new EventEmitter();
  subscription: Subscription;
  confPassword: FormControl;
  utente: FormGroup;

  // Flags
  @Input() edit: boolean;
  usn: boolean = false;
  wrongEmail: boolean = false;
  maxPwdLen: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private accService: ManageService, private tServ: ToastService) {
    // Get subject profile (empty if not logged)
    this.subscription = this.accService.getProfile().subscribe(x => {
      if (x) {
        this.user = x;
      }
      else {
        this.user = new User();
      }
    });
    // Build form object
    this.utente = this.formBuilder.group(this.user);
    this.confPassword = new FormControl('');
  }

  ngOnInit() {
    console.clear();
    (this.edit) ? console.log('Profile editing mode.') : console.log('Register new profile.');
    if (this.edit) this.utente.setValue(this.accService.getUser());
  }

  // Controls if the username already exists
  usernameControl(): void {
    if (localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')).find(el => el.username === this.utente.get('username').value)) {
      this.usn = true;
      document.getElementById('uname').style.border = '1.5px solid red';
    }
    else {
      this.usn = false;
      document.getElementById('uname').style.border = '1px solid transparent';
    }
  }

  // Controls integrity of e-mail field
  emailControl(): void {

    var str = this.utente.get('email').value;
    var c = str[str.length - 1];

    if (str.length > 0 && str.length <= 15) {
      if (c == ',' || c == ' ') this.wrongEmail = true;
      else this.wrongEmail = false;
    }

    else {

      if (c == '@') {
        if (str[str.length - 2] == '.' || str[str.length - 2] == ',' || str[str.length - 2] == '@' || str.indexOf('@') < str.length - 1) this.wrongEmail = true;
        else this.wrongEmail = false;
      }

      else if (c == '.') {
        if (str[str.length - 2] == '.' || str[str.length - 2] == ',' || str[str.length - 2] == '@') this.wrongEmail = true;
        else this.wrongEmail = false;
      }

      else {

        if (str.indexOf(' ') > -1 || str.indexOf(',') > -1 || str.indexOf('@') == -1 || str.indexOf('.') == -1 || str.indexOf('@') == 0 || str.indexOf('.') == 0 || str.indexOf('@') == str.length - 1 || str.indexOf('.') == str.length - 1) {
          this.wrongEmail = true;
        }
        else {
          this.wrongEmail = false;
        }

        if (!isNaN(parseInt(c)) && str.indexOf('@') > 0 && str.indexOf('@') < str.length - 1) {
          this.wrongEmail = true;
        }

      }

    }

    // Show error message if the flag (wrongEmail) is true
    if (this.wrongEmail == true) {
      document.getElementById('email').style.border = '1.5px solid red';
    }
    else {
      document.getElementById('email').style.border = '1px solid transparent';
    }

  }

  // Controls e-mail integrity when the mouse is out of the input
  isEmail(str: string): void {
    if (!str) this.wrongEmail = false;
    else {
      if (str.indexOf('@') == -1 || str.indexOf('.') == -1) this.wrongEmail = true;
    }
    if (this.wrongEmail == true) {
      document.getElementById('email').style.border = '1.5px solid red';
    }
    else {
      document.getElementById('email').style.border = '1px solid transparent';
    }
  }

  // Controls if the password confirmed is the same of the real password
  confirmPassword(): boolean {
    return (this.confPassword.value && this.utente.get('password').value) && (this.confPassword.value == this.utente.get('password').value);
  }

  // Register method
  register(): void {

    // If 'users' already exists
    if (localStorage.getItem('users')) {

      // Update
      if (this.edit) {
        const newList = JSON.parse(localStorage.getItem('users')).filter(el => el.username != this.utente.get('username').value);
        localStorage.setItem('users', JSON.stringify([...newList, this.utente.value]));
        this.accService.setProfile(this.utente.value);
        this.onUpdate.emit();
        this.tServ.setValues('Profilo aggiornato!', 'success');
        console.log("Profilo aggiornato.");
        this.router.navigate(['app-index/home']);
      }

      // Register
      else {
        localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users')), this.utente.value]));
        this.router.navigate(['']);
        this.tServ.setValues('Utente registrato!', 'success');
      }
    }

    // Else it creates the 'users' object array
    else {
      localStorage.setItem('users', JSON.stringify([this.utente.value]));
      this.router.navigate(['']);
      this.tServ.setValues('Utente registrato!', 'success');
    }

  }

}