import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SubTask, Task } from 'src/app/services/models';
import { v4 as uuid } from 'uuid'
@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent {

  dark: boolean

  @Input()
  task: Task

  @Input()
  options

  taskForm: FormGroup

  @Output()
  submitTask = new EventEmitter()

  @Output()
  deletedTask = new EventEmitter()

  subtasks: SubTask[]
  subtask: SubTask
  status: string
  isEditing = true

  checked = false
  toggleDelete = false
  inputSubtask = false
  selectValue
  constructor(private dataService: DataService) {
    this.dark = this.dataService.getTheme()
  }

  ngOnInit() {
    this.task = this.dataService.getTaskById(this.task.id)
    this.taskForm = new FormGroup({
      title: new FormControl({
        value: this.task?.title,
        disabled: !this.isEditing
      }),
      description: new FormControl({
        value: this.task?.description,
        disabled: !this.isEditing
      }),
      subtask: new FormControl('')
    })
    this.subtasks = this.task.subtasks
    this.status = this.task.status

  }

  getClasses() {
    const classes = []

    if (this.dark === true) classes.push('dark')
    if (this.checked === true) classes.push('completed')
    return classes
  }

  handleCheck(value, i) {
    this.subtasks[i].completed = value
    value === true ? this.checked = true : this.checked = false
  }

  onSubmit() {
    const task: Task = {
      ...this.task,
      subtasks: this.subtasks,
      title: this.taskForm.value['title'],
      description: this.taskForm.value['description'],
      status: this.status
    }
    this.task = task
    this.submitTask.emit(this.task)
  }

  confirmDelete() {
    this.toggleDelete = !this.toggleDelete
  }

  deleteTask(id: string) {

    this.dataService.deleteTask(id)
    this.deletedTask.emit()

  }
  handleAddSubtask() {
    const input: HTMLInputElement = document.querySelector('#addSubtask')
    if (this.inputSubtask === false) {
      this.inputSubtask = true
    }
    else {
      this.subtasks.push({
        id: uuid(),
        title: input.value,
        completed: false
      })
      input.value = ''
      this.inputSubtask = false
    }
  }
  handleDelete(index: number) {
    this.subtasks.splice(index, 1)
  }

  handleSelect(status: string) {
    this.status = status
  }
}
