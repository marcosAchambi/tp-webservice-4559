import {
  Component,
  OnInit
} from '@angular/core';
import {
  RouterLink
} from '@angular/router';

@Component ({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;

  ngOnInit(): void {
    // Check for saved theme preference or use the system preference
    if (localStorage.getItem ('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) && window.matchMedia ('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add ('dark');
      this.isDarkMode = true;
    } else {
      document.documentElement.classList.remove ('dark');
      this.isDarkMode = false;
    }
  }

  toggleTheme(): void {
    // Toggle dark mode
    this.isDarkMode = !this.isDarkMode;

    // Update the DOM and localStorage
    if (this.isDarkMode) {
      document.documentElement.classList.add ('dark');
      localStorage.setItem ('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove ('dark');
      localStorage.setItem ('color-theme', 'light');
    }
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle ('dark', this.isDarkMode);
  }
}
