import { Component, OnInit, Output } from '@angular/core';
import { User } from '../user.model';
import { ManageService } from '../services/manage.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homeindex',
  templateUrl: './homeindex.component.html',
  styleUrls: ['./homeindex.component.css']
})

export class HomeindexComponent implements OnInit {

  // Properties
  user = new User();
  subscription: Subscription;
  breadCrumbs: string;

  constructor(private accService: ManageService, private router:Router, private route: ActivatedRoute) {
    // Get profile from service
    this.subscription = this.accService.getProfile().subscribe(
      res=>this.user=res
    );
   }

  // Get static profile and update breadcrumbs
  ngOnInit() {
    this.user={...this.accService.getUser()};
    this.updateBreadcrumbs();
  }

  updateBreadcrumbs(){
    // Reads URL string and prints to breadcrumbs
    this.subscription = this.route.url.subscribe(
      res=>{
        this.breadCrumbs = res[0].path;
        // If route has children
        if(this.route.children) {
          this.subscription = this.route.children[0].url.subscribe(
            res=>{
              this.breadCrumbs += ' > '+res[0].path;
              // If child route has params
              if(this.route.children[0].params){
                this.subscription = this.route.children[0].params.subscribe(
                  res=>{
                    // Takes product.id param in the breadcrumbs
                    if(res.id)
                    this.breadCrumbs += ' > '+res.id;
                  }
                );
              }
            }
          );
        } 
      }
    );
    // End of subscription
  }

  // Logout method
  logout(): void {
    this.accService.clear();
    this.router.navigate(['']);
  }

}
