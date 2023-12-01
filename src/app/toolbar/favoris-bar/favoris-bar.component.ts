// favoris-bar.component.ts
import { Component } from '@angular/core';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favoris-bar',
  templateUrl: './favoris-bar.component.html',
  styleUrls: ['./favoris-bar.component.css'],
})
export class FavorisBarComponent {
  favorites: string[];

  constructor(private favoritesService: FavoritesService) {
    this.favorites = favoritesService.getFavorites();
  }

  removeFavorite(index: number): void {
    this.favoritesService.removeFavorite(index);
  }

  testVisibility(): void {
    console.log('Le bouton a été cliqué depuis app-favoris-bar.');
  }
}
