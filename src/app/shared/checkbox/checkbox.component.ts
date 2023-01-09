import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input()
  dark
  @Input()
  ngClass: string | string[]
  @Input()
  checked: boolean

  @Output()
  isChecked = new EventEmitter()

  constructor(private dataService: DataService) {
    this.dark = this.dataService.getTheme()
  }
  handleCheck(event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked
    this.isChecked.emit(this.checked)
  }

  getClasses() {
    const classes = []

    if (this.dark === true) classes.push('dark')
    if (this.checked === true) classes.push('completed')
    return classes
  }
}
