import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input()
  formGroup: FormGroup

  @Input()
  formControlName: FormControlName

  @Input()
  type: 'input' | 'textarea'

  @Input()
  placeholder: 'string'

  validationError = false
  errorMessage = 'Error message'
  ngOnInit() {

  }
}
