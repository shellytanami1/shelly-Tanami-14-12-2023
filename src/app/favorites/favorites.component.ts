import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites/favorites.service';
import { WeatherService } from '../services/weatherData/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  favoritesCities: any;

  constructor(private weatherService: WeatherService,
              private router: Router,
              private favoritesService: FavoritesService) {}

  ngOnInit(){

    this.favoritesService.favoritesCities$.subscribe((favoritesDetails) => {

      this.favoritesCities = favoritesDetails;
      this.favoritesCities = Object.entries(this.favoritesCities).map(([key, value]) => ({ Key:key, ...this.favoritesCities[key] }));
    });

  }

  goToHomePageWithCity(location: object){

    this.weatherService.setCurrentCity(location);
    this.router.navigate(['/home']);
  }
}
