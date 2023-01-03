import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input()
  dark: boolean

  @Input()
  task: string

  @Input()
  totalSubtasks: number

  @Input()
  completedSubtasks: number
}
