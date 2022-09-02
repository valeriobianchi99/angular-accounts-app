import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../prodotto.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-articolo',
  templateUrl: './articolo.component.html',
  styleUrls: ['./articolo.component.css']
})

export class ArticoloComponent implements OnInit {

  // Properties
  sub: Subscription;
  id: any;
  prod = new Prodotto();
  prodotto: FormGroup;

  // Flags
  edit: boolean;
  price: boolean = false;
  idcont: boolean = false;
  modalif: boolean = false;
  confirmElim = false;

  constructor(private formsBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toast: ToastService) {
    console.clear();
    // Obtaining id of current product from the URL string
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    // If there is id, the edit mode is activated
    if (this.id) {
      this.edit = true;
      this.prod = JSON.parse(localStorage.getItem('products')).find(el => el.id == this.id);
    }
    if (this.edit) {
      console.log('Product editing mode');
    }
    else {
      console.log('New product.');
    }
    // Creating the form structure
    this.prodotto = this.formsBuilder.group(this.prod);
  }

  ngOnInit() {
  }

  // Returns the next id to add in the array
  getId(): number {
    var list = JSON.parse(localStorage.getItem('products'));
    var num = 0;
    for (var prodotto in list) {
      if (parseInt(list[prodotto].id) > num) num = parseInt(list[prodotto].id);
    }
    return num + 1;
  }

  // Controls if ane element with the name given in input exists 
  isPresent(nome: string): boolean {
    return JSON.parse(localStorage.getItem('products')).find(el => el.nome === nome);
  }

  // Deletes product
  deleteProduct(): void {
    var newList = JSON.parse(localStorage.getItem('products')).filter(a => a.id !== this.prodotto.get('id').value);
    localStorage.setItem('products', JSON.stringify(newList));
    this.edit = false;
    this.prod = new Prodotto();
    this.confirmElim = false;
    console.log('Product deleted.');
    this.toast.setValues('Prodotto eliminato!', 'success');
    this.router.navigate(['app-index/catalogo']);
  }


  // Controls integrity of price field
  priceControl(): void {
    var str = this.prodotto.get('prezzo').value.toString();
    var c = str[str.length - 1];


    if (isNaN(c) && c != ',') {
      this.price = true;
    }

    if (str.length == 0) this.price = false;

    else {
      if (c == ',') {
        if (str.indexOf(',') < str.length - 1) this.price = true;
        else this.price = false;
      }
      else {
        if (isNaN(this.prodotto.get('prezzo').value)) this.price = true;
        else this.price = false;
      }
    }

    // Show the error to the input if the error (price) flag is true
    if (this.price == true) {
      document.getElementById('prezzo').style.border = '1.5px solid red';
    }
    else {
      document.getElementById('prezzo').style.border = '1px solid transparent';
    }
  }



  // Adds new product
  addProduct(): void {

    // If 'products' already exists
    if (localStorage.getItem('products')) {

      // Update product
      if (this.edit) {
        console.log('Aggiornamento dati...');
        var newList = JSON.parse(localStorage.getItem('products')).filter(a => a.id !== this.prodotto.get('id').value);
        localStorage.setItem('products', JSON.stringify([...newList, this.prodotto.value]));
        this.prod = new Prodotto();
        console.log('Prodotto aggiornato.');
        this.toast.setValues('Prodotto aggiornato!', 'success');
        this.router.navigate(['/app-index/catalogo']);
      }

      // Add product
      else {
        if (this.isPresent(this.prodotto.get('nome').value)) {
          this.toast.setValues('Un prodotto con questo nome è già presente!', 'error');
        }
        else {
          this.prodotto.get('id').setValue(this.getId());
          console.log('Caricamento...');
          localStorage.setItem('products', JSON.stringify([...JSON.parse(localStorage.getItem('products')), this.prodotto.value]));
          this.prod = new Prodotto();
          console.log('Prodotto aggiunto.');
          this.toast.setValues('Prodotto aggiunto!', 'success');
          this.router.navigate(['/app-index/catalogo']);
        }
      }
    }

    // Else it creates the array
    else {
      console.log('Caricamento...');
      localStorage.setItem('products', JSON.stringify([this.prodotto.value]));
      this.idcont = false;
      this.prod = new Prodotto();
      console.log('Prodotto aggiunto.');
      this.toast.setValues('Prodotto aggiunto!', 'success');
      this.router.navigate(['/app-index/catalogo']);
    }
  }

}