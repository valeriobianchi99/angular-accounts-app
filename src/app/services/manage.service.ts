import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ManageService {

  // Properties
  user: User;
  private actualLogin = new Subject<User>();

  constructor() {
  }

  // Set profiles
  setProfile(a: User): void {
    this.user = a;
    this.actualLogin.next(a);
  }

  // Get observable object
  getProfile(): Observable<User> {
    return this.actualLogin.asObservable();
  }

  // Get object
  getUser() {
    return this.user;
  }

  // Clear value of actualLogin
  clear(): void {
    this.actualLogin.next();
  }

}
