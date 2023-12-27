import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {


  // private favoritesCitiesSubject = new BehaviorSubject<any>({});
  private favoritesCitiesSubject = new BehaviorSubject<any>({
    "213181": {
        "LocalObservationDateTime": "2023-12-26T11:02:00+02:00",
        "EpochTime": 1703581320,
        "WeatherText": "Sunny",
        "WeatherIcon": 1,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 20,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 68,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/current-weather/213181?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/haifa/213181/current-weather/213181?lang=en-us",
        "LocalizedName": "Haifa"
    },
    "215854": {
        "LocalObservationDateTime": "2023-12-26T10:52:00+02:00",
        "EpochTime": 1703580720,
        "WeatherText": "Mostly sunny",
        "WeatherIcon": 2,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 21.8,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 71,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "LocalizedName": "tel aviv"
    },
    "328328": {
        "LocalObservationDateTime": "2023-12-26T09:02:00+00:00",
        "EpochTime": 1703581320,
        "WeatherText": "Sunny",
        "WeatherIcon": 1,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 7.7,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 46,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/current-weather/328328?lang=en-us",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/current-weather/328328?lang=en-us",
        "LocalizedName": "London"
    }
});
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
