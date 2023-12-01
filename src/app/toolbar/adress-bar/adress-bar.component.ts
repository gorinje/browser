// adress-bar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-adress-bar',
  templateUrl: './adress-bar.component.html',
  styleUrls: ['./adress-bar.component.css'],
})
export class AdressBarComponent {
  url: string = '';

  constructor() {}

  addToFavorites(): void {
    if (this.url && this.url.trim() !== '') {
      // Vous ajouterez le code ici pour ajouter le lien aux favoris
      console.log('Ajouté aux favoris :', this.url);
    }
  }
}
