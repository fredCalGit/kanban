import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  tabs: string[] = ['Platform Lauch', 'Marketing Plan', 'Roadmap', 'Platform Lauch', 'Marketing Plan', 'Roadmap', 'Platform Lauch', 'Marketing Plan', 'Roadmap',]
  isSelected: boolean = false
  activeTab: number = 0

  @Input()
  dark: boolean

  @Input()
  enableDropdown: boolean

  @Output()
  toggleDark = new EventEmitter<boolean>()

  @Output()
  showDropdown = new EventEmitter<boolean>()


  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value
  }
  ngOnDestroy() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value
    console.log('nooo', this.dark)
  }

  toggleDarkEvent(event) {
    this.toggleDark.emit(event)
    this.dark = event
  }

  openDropdown() {
    this.enableDropdown = true
    this.showDropdown.emit(true)
    console.log('open dropdown')
    console.log('dropdown state', this.enableDropdown)

  }
  closeDropdown() {
    this.enableDropdown = false
    this.showDropdown.emit(false)

  }

  onSelect(index: number) {
    this.activeTab = index
    this.enableDropdown = false;
    this.showDropdown.emit(false)
  }
}
