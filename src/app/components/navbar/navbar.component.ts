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

  @Output()
  toggle = new EventEmitter<boolean>()

  constructor() {

  }

  handleToggleSidebarEvent() {
    this.toggle.emit(!this.hasSidebar)
  }


}
