import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of } from 'rxjs';
import { configuration } from '../../../configuration';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = configuration.apiKey;
  private apiHost = configuration.apiHost;

  private autoCompleteUrl = configuration.autoCompleteUrl;
  private currentWeatherUrl = configuration.currentWeatherUrl;
  private FiveDaysForecastsUrl = configuration.FiveDaysForecastsUrl;

  private weatherHistorySubject = new BehaviorSubject<any>({});
  weatherHistory$: Observable<any> = this.weatherHistorySubject.asObservable();

  private currentCitySubject = new BehaviorSubject<any>(null);
  currentCity$: Observable<any> = this.currentCitySubject.asObservable();


  constructor(private http: HttpClient) { }


  searchCity(city: string): Observable<any>{

    return this.http.get<any[]>(`${this.apiHost}/${this.autoCompleteUrl}?apikey=${this.apiKey}&q=${city}`)
     .pipe(
       catchError((error) => {
          return of({error:'Something went wrong. Please try again later.'});
       })
     );
  }

  getDataWeather(locationId: string, locationName: string): Observable<any> {

    if (this.weatherHistorySubject.value[locationId]) {
      return of(this.weatherHistorySubject.value[locationId]);
    } else {
      return forkJoin([
        this.getCurrentWeather(locationId),
        this.getForecasta(locationId)
      ]).pipe(
        map(([currentWeather, forecastsData]) => {
          if((currentWeather & currentWeather.error) || (forecastsData && forecastsData.error)){
            return {error:'Something went wrong. Please try again later.'};
          }
          var weatherHistory = this.weatherHistorySubject.value;

          weatherHistory[locationId] = { currentWeather, forecastsData };
          weatherHistory[locationId].currentWeather[0].LocalizedName = locationName;
          this.weatherHistorySubject.next(weatherHistory);

          return this.weatherHistorySubject.value[locationId];
        })
      );
    }
  }

  getCurrentWeather(locationId: string): Observable<any>{

    return this.http.get<any[]>(`${this.apiHost}/${this.currentWeatherUrl}/${locationId}?apikey=${this.apiKey}`)
      .pipe(
        catchError((error) => {
          return of({error:'Something went wrong. Please try again later.'});
        })
      );

  }

  getForecasta(locationId: string): Observable<any>{

    return this.http.get<any[]>(`${this.apiHost}/${this.FiveDaysForecastsUrl}/${locationId}?apikey=${this.apiKey}&metric=true`)
      .pipe(
        catchError((error) => {
          return of({error:'Something went wrong. Please try again later.'});
        })
      );
  }

  setCurrentCity(location: any){

    this.currentCitySubject.next(location);
  }
}
