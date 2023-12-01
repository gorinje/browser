// favorites.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: string[] = [];

  addFavorite(url: string): void {
    this.favorites.push(url);
    this.saveFavorites();
  }

  getFavorites(): string[] {
    return this.favorites;
  }

  removeFavorite(index: number): void {
    this.favorites.splice(index, 1);
    this.saveFavorites();
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
