import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccountcontrolService {

  constructor() { }
  
  // Controls if username and password are in the localStorage, when user tries to login
  userControl(username: string, password: string):boolean {
    return (JSON.parse(localStorage.getItem('users')).find(el => el.username===username && el.password===password));
  }
}
