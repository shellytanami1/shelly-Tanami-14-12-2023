import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = "i8IJYZrdDsvtCTpbHdBOZIEndujVYWm1";
  private apiHost = "http://dataservice.accuweather.com";

  private autoCompleteUrl = "locations/v1/cities/autocomplete";
  private currentWeatherUrl = "currentconditions/v1";
  private FiveDaysForecastsUrl = "forecasts/v1/daily/5day";


  // private weatherHistorySubject = new BehaviorSubject<any>({});
  private weatherHistorySubject = new BehaviorSubject<any>({
    "213181": {
        "currentWeather": [
            {
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
            }
        ],
        "forecastsData": {
            "Headline": {
                "EffectiveDate": "2023-12-26T19:00:00+02:00",
                "EffectiveEpochDate": 1703610000,
                "Severity": 7,
                "Text": "Mild Tuesday night",
                "Category": "heat",
                "EndDate": "2023-12-27T07:00:00+02:00",
                "EndEpochDate": 1703653200,
                "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?unit=c&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?unit=c&lang=en-us"
            },
            "DailyForecasts": [
                {
                    "Date": "2023-12-26T07:00:00+02:00",
                    "EpochDate": 1703566800,
                    "Temperature": {
                        "Minimum": {
                            "Value": 16.3,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 21.7,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=1&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=1&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-27T07:00:00+02:00",
                    "EpochDate": 1703653200,
                    "Temperature": {
                        "Minimum": {
                            "Value": 15.4,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 22.7,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 34,
                        "IconPhrase": "Mostly clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=2&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=2&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-28T07:00:00+02:00",
                    "EpochDate": 1703739600,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.7,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 20.8,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 5,
                        "IconPhrase": "Hazy sunshine",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=3&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=3&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-29T07:00:00+02:00",
                    "EpochDate": 1703826000,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.4,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 21.5,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=4&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=4&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-30T07:00:00+02:00",
                    "EpochDate": 1703912400,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.5,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 21.4,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 34,
                        "IconPhrase": "Mostly clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=5&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/haifa/213181/daily-weather-forecast/213181?day=5&unit=c&lang=en-us"
                }
            ]
        }
    },
    "215854": {
        "currentWeather": [
            {
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
            }
        ],
        "forecastsData": {
            "Headline": {
                "EffectiveDate": "2023-12-26T19:00:00+02:00",
                "EffectiveEpochDate": 1703610000,
                "Severity": 7,
                "Text": "Mild Tuesday night",
                "Category": "heat",
                "EndDate": "2023-12-27T07:00:00+02:00",
                "EndEpochDate": 1703653200,
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
            },
            "DailyForecasts": [
                {
                    "Date": "2023-12-26T07:00:00+02:00",
                    "EpochDate": 1703566800,
                    "Temperature": {
                        "Minimum": {
                            "Value": 15.8,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 24,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-27T07:00:00+02:00",
                    "EpochDate": 1703653200,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.8,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 22.8,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 5,
                        "IconPhrase": "Hazy sunshine",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 35,
                        "IconPhrase": "Partly cloudy",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-28T07:00:00+02:00",
                    "EpochDate": 1703739600,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.2,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 22.1,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 5,
                        "IconPhrase": "Hazy sunshine",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 34,
                        "IconPhrase": "Mostly clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-29T07:00:00+02:00",
                    "EpochDate": 1703826000,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.9,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 23.4,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 5,
                        "IconPhrase": "Hazy sunshine",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-30T07:00:00+02:00",
                    "EpochDate": 1703912400,
                    "Temperature": {
                        "Minimum": {
                            "Value": 14.3,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 23.4,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 1,
                        "IconPhrase": "Sunny",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 33,
                        "IconPhrase": "Clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
                }
            ]
        }
    },
    "328328": {
        "currentWeather": [
            {
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
        ],
        "forecastsData": {
            "Headline": {
                "EffectiveDate": "2023-12-27T01:00:00+00:00",
                "EffectiveEpochDate": 1703638800,
                "Severity": 3,
                "Text": "Expect rainy weather late Tuesday night through Wednesday afternoon",
                "Category": "rain",
                "EndDate": "2023-12-27T19:00:00+00:00",
                "EndEpochDate": 1703703600,
                "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?unit=c&lang=en-us",
                "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?unit=c&lang=en-us"
            },
            "DailyForecasts": [
                {
                    "Date": "2023-12-26T07:00:00+00:00",
                    "EpochDate": 1703574000,
                    "Temperature": {
                        "Minimum": {
                            "Value": 6.1,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 9.4,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 6,
                        "IconPhrase": "Mostly cloudy",
                        "HasPrecipitation": false
                    },
                    "Night": {
                        "Icon": 12,
                        "IconPhrase": "Showers",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-27T07:00:00+00:00",
                    "EpochDate": 1703660400,
                    "Temperature": {
                        "Minimum": {
                            "Value": 9.6,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 12.9,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 18,
                        "IconPhrase": "Rain",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Night": {
                        "Icon": 34,
                        "IconPhrase": "Mostly clear",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=2&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-28T07:00:00+00:00",
                    "EpochDate": 1703746800,
                    "Temperature": {
                        "Minimum": {
                            "Value": 7.4,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 12.4,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 13,
                        "IconPhrase": "Mostly cloudy w/ showers",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Night": {
                        "Icon": 36,
                        "IconPhrase": "Intermittent clouds",
                        "HasPrecipitation": false
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=3&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-29T07:00:00+00:00",
                    "EpochDate": 1703833200,
                    "Temperature": {
                        "Minimum": {
                            "Value": 4.4,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 10.2,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 12,
                        "IconPhrase": "Showers",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Night": {
                        "Icon": 12,
                        "IconPhrase": "Showers",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=4&unit=c&lang=en-us"
                },
                {
                    "Date": "2023-12-30T07:00:00+00:00",
                    "EpochDate": 1703919600,
                    "Temperature": {
                        "Minimum": {
                            "Value": 4.4,
                            "Unit": "C",
                            "UnitType": 17
                        },
                        "Maximum": {
                            "Value": 8,
                            "Unit": "C",
                            "UnitType": 17
                        }
                    },
                    "Day": {
                        "Icon": 29,
                        "IconPhrase": "Rain and snow",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Mixed",
                        "PrecipitationIntensity": "Light"
                    },
                    "Night": {
                        "Icon": 18,
                        "IconPhrase": "Rain",
                        "HasPrecipitation": true,
                        "PrecipitationType": "Rain",
                        "PrecipitationIntensity": "Light"
                    },
                    "Sources": [
                        "AccuWeather"
                    ],
                    "MobileLink": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&unit=c&lang=en-us",
                    "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=5&unit=c&lang=en-us"
                }
            ]
        }
    }
});
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
