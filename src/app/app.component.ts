import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';
import { Toast } from './toast.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // Properties
  toast: Toast;
  sub: Subscription;

  // Flags
  alert: boolean = false;

  constructor(private tServ: ToastService) {
    // Subscribe to the toast component values
    this.sub = this.tServ.getToastS().subscribe(
      a => this.toast = a
    );
    this.sub = this.tServ.getViewValue().subscribe(
      a => {
        // To show or not
        this.alert = a;
        if (this.alert) this.close();
      }
    );
  }

  ngOnInit() {
    this.alert = this.tServ.getView();
    this.toast = this.tServ.getToast();
  }

  // Close ngb-toast after 1,4 seconds
  close() {
    setTimeout(() => this.alert = false, 1400);
  }

}
