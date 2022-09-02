// Model for products
export class Prodotto {

    // Properties
    id: number;
    nome: string;
    descrizione: string;
    prezzo: number;

    constructor(){
        this.id = 1;
        this.nome = '';
        this.descrizione = '';
        this.prezzo = null;
    }
}