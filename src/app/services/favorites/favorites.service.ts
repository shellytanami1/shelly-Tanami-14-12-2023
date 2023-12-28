import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesCitiesSubject = new BehaviorSubject<any>({});
  favoritesCities$: Observable<any> = this.favoritesCitiesSubject.asObservable();


  constructor() { }


  addToFavorives(cityObj: any){

    var currentFavoritesCities = { ...this.favoritesCitiesSubject.value };
    currentFavoritesCities[cityObj.Key] = cityObj;
    this.favoritesCitiesSubject.next(currentFavoritesCities);
  }

  removeFromFavorites(cityObj: any){

    var currentFavoritesCities = { ...this.favoritesCitiesSubject.value };
    delete currentFavoritesCities[cityObj.Key];
    this.favoritesCitiesSubject.next(currentFavoritesCities);
  }

  isFavorite(locationId: string){
    return this.favoritesCitiesSubject.value.hasOwnProperty(locationId);
  }

}
