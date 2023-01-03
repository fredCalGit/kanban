import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DialogComponent } from './dialog/dialog.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [ButtonComponent, CheckboxComponent, TextFieldComponent, ToggleSwitchComponent, TaskCardComponent, DialogComponent, InputComponent, SelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ButtonComponent, CheckboxComponent, ToggleSwitchComponent, TaskCardComponent, DialogComponent, SelectComponent]
})
export class SharedModule { }
