import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  light:string = "#f8f9fa";
  dark:string = "#706c6c";

  lightBack:string = "white";
  darkBack:string = "#3c3a3a";

  lightFont:string = "rgb(33, 37, 41)";
  darkFont:string = "white";

  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();


  constructor() { }


  toggleDarkMode() {

    const currentMode = this.darkModeSubject.value;
    this.darkModeSubject.next(!currentMode);
    this.updateTheme();
  }

  private updateTheme() {

    if(this.darkModeSubject.value){
      document.documentElement.style.setProperty('--background-element', this.dark);
      document.documentElement.style.setProperty('--background-body', this.darkBack);
      document.documentElement.style.setProperty('--font-color', this.darkFont);
    }
    else{
      document.documentElement.style.setProperty('--background-element', this.light);
      document.documentElement.style.setProperty('--background-body', this.lightBack);
      document.documentElement.style.setProperty('--font-color', this.lightFont);

    }
  }

}
