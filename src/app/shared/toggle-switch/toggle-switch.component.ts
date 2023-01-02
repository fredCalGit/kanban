import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent {
  @Input()
  checked: boolean = false

  @Output()
  toggle = new EventEmitter()

  onClick() {
    this.checked = !this.checked
    this.toggle.emit(this.checked)
  }
}
