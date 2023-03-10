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
  ]

  @Output()
  selected = new EventEmitter()

  constructor() {
    this.options = this.options.map(el => {
      return {
        label: el.label,
        value: this.slugify(el.value)
      }
    })
  }
  handleSelect(event: Event) {

    const target = event.target as HTMLSelectElement

    this.selected.emit(target.value)
  }

  slugify(string: string) {
    let result = ''
    string.split('').forEach(el => {
      if (el !== ' ') { result += el.toLowerCase() }
      else {
        result += '-'
      }
    })
    return result
  }

}
