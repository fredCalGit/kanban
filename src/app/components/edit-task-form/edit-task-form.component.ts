import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/services/models';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent {
  @Input()
  dark: boolean

  @Input()
  task: Task


  taskForm: FormGroup

  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value

    console.log('form', this.task)
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task?.title),
      description: new FormControl(this.task?.description),
    })
  }

  onSubmit() {
    console.log('form', this.taskForm.controls['value'])
  }
}
