import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})

export class UtentiComponent implements OnInit {

  // Properties
  utenti: User[] = [];
  userToEliminate = new User();

  // Flags 
  confirmElim = false;

  constructor(private toast: ToastService) { }

  ngOnInit() {
    // Get of users
    this.utenti = JSON.parse(localStorage.getItem('users'));
  }

  // Opens ngb-toast to confirm elimination
  confirmElimination(obj: User) {
    this.confirmElim = true;
    this.userToEliminate = obj;
  }

  // Deletes user
  deleteUser(utente: User): void {
    var newList = JSON.parse(localStorage.getItem('users')).filter(a => a.username !== utente.username);
    localStorage.setItem('users', JSON.stringify(newList));
    this.utenti = newList;
    this.toast.setValues('Utente eliminato!', 'success');
    this.confirmElim = false;
  }

}
