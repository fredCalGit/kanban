import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  tabs: string[] = ['Platform Lauch', 'Marketing Plan', 'Roadmap']
  isSelected: boolean = false
  activeTab: number = 0
  hideBar: boolean = false
  @Input()
  dark: boolean = false

  @Output()
  isDark = new EventEmitter()



  toggleDark() {
    this.dark = !this.dark
    this.isDark.emit(this.dark)
  }

  toggleBar() {
    this.hideBar = !this.hideBar
  }
}
