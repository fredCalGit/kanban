import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';

interface Option {
  value: string,
  label: string
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input()
  defaultValue: string

  @Input()
  dark: boolean;

  @Input()
  options: Option[] = [
    {
      label: 'To do',
      value: 'todo'
    },
    {
      label: 'Doing',
      value: 'doing'
    },
    {
      label: 'Done',
      value: 'done'
    },
    {
      label: 'Other',
      value: 'custom'
    },
  ]

  @Output()
  selected = new EventEmitter()


  handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement

    this.selected.emit(target.value)
  }
}
