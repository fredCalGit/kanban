import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  dark: boolean

  @Input()
  hasSidebar: boolean

  showDropdown = false

  @Output()
  displayDropdown = new EventEmitter<boolean>()

  isMobile: boolean
  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value
    this.isMobile = screen.width < 600
    console.log('mobile', this.isMobile)
  }

  addTask() { }

  closeDropdown() {
    this.showDropdown = false
    this.displayDropdown.emit(false)
  }
  openDropdown() {
    this.showDropdown = true
    this.displayDropdown.emit(true)
  }

  toggleDropdown() {
    console.log('navbar click?')
    this.showDropdown === true ? this.closeDropdown() : this.openDropdown()
    console.log('navbar state', this.showDropdown)
  }






}
