import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/services/models';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input()
  dark: boolean

  @Input()
  task: Task

  totalSubtasks: number

  @Input()
  completedSubtasks: number

  constructor() {


  }
  ngOnInit() {
    if (this.task !== undefined) {
      this.completedSubtasks = this.task.subtasks?.filter(el => el.completed === true).length
      this.totalSubtasks = this.task.subtasks?.length
    }
  }
}
