import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // Properties
  view: boolean;
  viewValue = new Subject<boolean>();
  toast: Toast;
  toastS= new Subject<Toast>();

  constructor() { }

  // Shows the toast with the given values
  setValues(s: string, t: string){
    this.view = true;
    this.toast = new Toast(s, t);
    this.toastS.next(this.toast);
    this.viewValue.next(true);
  }

  getToast(){
    return this.toast;
  }

  getToastS(){
    return this.toastS.asObservable();
  }

  getView(){
    return this.view;
  }

  getViewValue(){
    return this.viewValue.asObservable();
  }




}
