import { Component, OnInit } from '@angular/core';
import { ManageService } from '../services/manage.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // Properties
  user: User;
  subscription: Subscription;

  // Flags
  upd: boolean = false;
  showPassword: boolean = false;

  constructor(private accService: ManageService, private router: Router) {
    // Get the profile informations (subject)
    this.subscription = this.accService.getProfile().subscribe(x => {
      if (x) {
        this.user = x;
      }
      else {
        console.log('Error - Undefined response.');
      }
    });
  }

  ngOnInit() {
    // Get static profile
    this.user = this.accService.getUser();
    console.clear();
    console.log('Profile: ' + this.user.lastname + ', ' + this.user.firstname);
  }

}
