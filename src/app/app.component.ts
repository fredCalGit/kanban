import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDark: boolean
  hideSidebar: boolean = false
  enableDropdown: boolean
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
    console.log(this.isDark, 'here')
  }
  onToggleSidebar() {
    this.hideSidebar = !this.hideSidebar
  }

  handleThemeChangeEvent(event: boolean) {
    this.isDark = event
    localStorage.setItem('theme', JSON.stringify({ value: event }))
  }

  handleToggleSidebarChangeEvent(event: boolean) {
    this.hideSidebar = event
  }
  handleToggleDropdownEvent(event: boolean) {
    console.log('EVENT', event)
    this.enableDropdown = event
    console.log('app drop state', this.enableDropdown)
  }
}
