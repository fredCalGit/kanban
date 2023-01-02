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
  hideBar: boolean

  @Output()
  toggleDark = new EventEmitter<boolean>()

  @Output()
  toggleDropdown = new EventEmitter<boolean>()

  ngOnInit() {
    const storage = localStorage.getItem('theme')
    if (storage) {
      this.dark = JSON.parse(storage).value
    }
  }

  toggleDarkEvent(event) {
    this.toggleDark.emit(event)
    this.dark = event
  }

  toggleBar() {
    this.hideBar = !this.hideBar
    this.toggleDropdown.emit(this.hideBar)
  }

  onSelect(index: number) {
    this.activeTab = index
    this.hideBar = true;
    this.toggleDropdown.emit(this.hideBar)
  }
}
