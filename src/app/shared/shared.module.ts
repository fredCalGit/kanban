import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [ButtonComponent, CheckboxComponent, TextFieldComponent, ToggleSwitchComponent, TaskCardComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, CheckboxComponent, ToggleSwitchComponent]
})
export class SharedModule { }
