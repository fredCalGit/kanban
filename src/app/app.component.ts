import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDark: boolean
  hideSidebar: boolean = false

  constructor() {
  }

  ngOnInit() {
    const storage = localStorage.getItem('theme')
    if (storage === null) {
      localStorage.setItem('theme', JSON.stringify({ value: this.isDark }))
    } else {
      const storage = localStorage.getItem('theme')
      const { value } = JSON.parse(storage)
      this.isDark = value
    }
  }
  onToggleSidebar() {
    this.hideSidebar = !this.hideSidebar
  }

  handleThemeChangeEvent(event: boolean) {
    this.isDark = event
    localStorage.setItem('theme', JSON.stringify({ value: event }))
  }
}
