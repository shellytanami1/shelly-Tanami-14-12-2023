import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, forkJoin, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { WeatherService } from '../services/weatherData/weather.service';
import * as $ from 'jquery';
import 'bootstrap';
import { FavoritesService } from '../services/favorites/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  modalElement: JQuery<HTMLElement> = $('#staticBackdrop');

  searchForm!: FormGroup;

  searchControl = new FormControl();
  filteredOptions: Observable<any[]> | undefined;
  cityObject: any = {
    Key: "215854",
    LocalizedName: "tel aviv"
  };

  forecasts: any;
  currentWeather: any;

  isFavorite: boolean = false;

  errorMessage: any = {};

  private currentCitySubscription: Subscription | undefined;
  private dataWeatherSubscription: Subscription | undefined;


  constructor(private fb: FormBuilder,
    private weatherService: WeatherService,
    private favoritesService: FavoritesService){}

  ngOnInit(){

    this.searchForm = this.fb.group({
      city: [null, Validators.required]
    })

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this._filter(value))
    );

    this.currentCitySubscription = this.weatherService.currentCity$.subscribe((cityDetails) => {
      if(cityDetails){
        this.cityObject = cityDetails;
      }
      this.getWeather(this.cityObject);

    });
  }

  private _filter(value: string): Observable<any[]> {

    if (!value || value.length < 3) {
      return of([]);
    }

    return this.weatherService.searchCity(value).pipe(
      map(result => {
        if(result && result.error){
          this.errorMessage = result;
          $('#errorModal').modal();
         }
        else return result;
      })
    );
  }

  displayFn(result: any): string {

    return result ? `${result.LocalizedName}, ${result.Country.LocalizedName}` : '';
  }

  onOptionSelected(option: any): void {

    this.getWeather(option.option.value);
  }

  getWeather(obj: any){
    
    this.cityObject = obj;
    this.isFavorite = this.favoritesService.isFavorite(this.cityObject.Key);

    this.dataWeatherSubscription = this.weatherService.getDataWeather(obj.Key, obj.LocalizedName).subscribe((res:any) =>{
      if(res && res.error){
        this.errorMessage = res;
        $('#errorModal').modal();
      }
      this.currentWeather = res.currentWeather;
      this.forecasts = res.forecastsData;
    });
  }

  toggleFavorite(){

    this.isFavorite = !this.isFavorite;
    if(this.isFavorite) this.favoritesService.addToFavorives(Object.assign(this.cityObject, this.currentWeather[0]));
    else this.favoritesService.removeFromFavorites(this.cityObject);
  }

  ngOnDestroy() {

    if (this.currentCitySubscription) {
      this.currentCitySubscription.unsubscribe();
    }
    if (this.dataWeatherSubscription) {
      this.dataWeatherSubscription.unsubscribe();
    }
  }

}
