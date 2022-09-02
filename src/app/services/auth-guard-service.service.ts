import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManageService } from './manage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(private toast:ToastService, private router: Router, private accService: ManageService) {
  }

  // Can Activate method
  canActivate(): boolean {
    console.log('Authentication...');
    // If there is an user logged
    if(this.accService.getUser()){
      return true;
    }
    // Redirecting to the login page
    else {
      this.toast.setValues('Reindirizzamento...','error');
      console.error('Sessione scaduta - Reindirizzamento...');
      document.getElementsByTagName('footer')[0].style.display = 'none';
      setTimeout(()=> {
        this.router.navigate(['']);
        document.getElementsByTagName('footer')[0].style.display = 'block';
      }, 1400);
      return false;
    }
  }

}
