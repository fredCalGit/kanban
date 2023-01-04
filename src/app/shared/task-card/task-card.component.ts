import { Component, Input } from '@angular/core';
import { Task } from 'src/app/components/board/board.component';

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
      console.log('TASK', this.task)
    }
  }
}
