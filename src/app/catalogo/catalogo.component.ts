import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../prodotto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit {

  // Properties
  prodotti: Prodotto[] = [];
  filtro: String;
  nomeUtente: String;
  subscription: Subscription;

  // Flags 
  showProducts: boolean = true;

  constructor(private router: Router) {
    console.clear();
    console.log('Welcome, this is the actual product list.');
  }

  // Get array of products
  ngOnInit() {
    this.prodotti = JSON.parse(localStorage.getItem('products'));
  }

  // Show article with id
  showDetails(id: any): void {
    this.router.navigate(['../articolo/' + id]);
  }

  // Filter the array
  filterBy(): void {
    var newList = JSON.parse(localStorage.getItem('products')).filter(a => a.nome.toLowerCase().indexOf(this.filtro) > -1 || a.descrizione.toLowerCase().indexOf(this.filtro) > -1);
    this.prodotti = newList;
  }

}
