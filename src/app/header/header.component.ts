import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  darkMode = false;
  private themeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.darkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
    });
  }

  toggleDarkMode(dark:boolean) {
    if(this.darkMode!=dark){
      this.themeService.toggleDarkMode();
    }

  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
