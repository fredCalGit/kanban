import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubTask, Task } from 'src/app/services/models';
import { v4 as uuid } from 'uuid'


@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css']
})
export class NewTaskFormComponent {
  newTaskForm: FormGroup
  subtasksForm: FormGroup

  subtasks: SubTask[] = []
  subtaskValue: string
  task: Task
  dark: boolean
  validationError: boolean
  errorMessage: string

  @Output()
  showDialog = new EventEmitter()

  options = [
    {
      value: 'todo',
      label: 'To do',
    },
    {
      value: 'doing',
      label: 'Doing',
    },
    {
      value: 'done',
      label: 'Done',
    },
  ]
  @Output() taskSubmit = new EventEmitter()

  status: string
  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value
  }
  ngOnInit() {

    this.newTaskForm = new FormGroup<any>({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl(null),
      subtask: new FormControl(null),
      status: new FormControl(null)
    })
  }

  handleSelectEvent(event: string) {
    this.status = event
    this.newTaskForm.controls['status'].setValue(event)

  }

  validateForm() {
    this.validationError = this.newTaskForm.controls['title'].errors !== null

    if (this.validationError) {
      console.log('yea')
      this.errorMessage = this.newTaskForm.controls['title'].errors?.['required'] === true ? 'Required' : 'Minimum length: 3 characters'
    } else {
      this.errorMessage = 'Required'
    }
    console.log(this.newTaskForm.controls['title'])
  }

  showErrors() {
    const { dirty, touched, errors } = this.newTaskForm.controls['title']

    return dirty && touched && errors
  }

  onSubtasksSubmit() {
    this.subtasks.push({
      id: uuid(),
      title: this.newTaskForm.value['subtask'],
      completed: false
    })
  }

  addSubtask() {
    this.onSubtasksSubmit()
    this.newTaskForm.value['subtask'] = null
    const input: HTMLInputElement = document.querySelector('#addSubtask')
    input.value = ''
  }

  onSubmit() {
    this.validateForm()
    if (this.validationError) return

    const newTask: Task = {
      id: uuid(),
      title: this.newTaskForm.value['title'],
      description: this.newTaskForm.value['description'],
      subtasks: [...this.subtasks],
      status: this.newTaskForm.value['status'] || 'todo',
      column: this.newTaskForm.value['status']
    }
    console.log('submited task', newTask)
    this.taskSubmit.emit(newTask)
    this.showDialog.emit(false)
  }

  handleDelete(index: number) {
    this.subtasks.splice(index, 1)
  }
}
