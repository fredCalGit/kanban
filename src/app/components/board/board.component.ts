import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';

export interface Board {
  id?: string;
  name: string;
  columns?: { name: string }[];
  tasks?: Task[]
}
export interface Task {
  id?: string;
  title: string;
  description: string;
  subtasks: SubTask[],
  status: 'todo' | 'doing' | 'done'
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input()
  isDark: boolean

  isEmpty: boolean = false


  @Input()
  board: Board

  tasks: Task[]

  paginatedTasks: Task[][]

  todoColumnIndex: number = 0
  doingColumnIndex: number = 0
  doneColumnIndex: number = 0

  todoData: Task[]
  doingData: Task[]
  doneData: Task[]

  customColumns: {
    label: string,
    tasks?: Task[]
  }[] = []

  constructor() {


  }
  ngOnInit() {
    if (this.board !== undefined) {
      this.tasks = this.board.tasks
    }
    this.todoData = this.getColumnData('todo', this.todoColumnIndex)
    this.doingData = this.getColumnData('doing', this.doingColumnIndex)
    this.doneData = this.getColumnData('done', this.doneColumnIndex)
  }

  getColumnData(status: 'todo' | 'doing' | 'done', index) {
    console.log('HERE --> ', this.paginate(this.getTasksByStatus(status), 5, index + 1))
    return this.paginate(this.getTasksByStatus(status), 5, index + 1)
  }

  paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  getTasksByStatus(status: 'todo' | 'doing' | 'done') {
    return this.board.tasks.filter(el => el.status === status)
  }

  nextPage(status) {
    if (status === 'todo') {
      this.todoColumnIndex = this.todoColumnIndex + 1
      this.todoData = this.getColumnData('todo', this.todoColumnIndex)
    }
    if (status === 'doing') {
      this.doingColumnIndex = this.doingColumnIndex + 1
      this.doingData = this.getColumnData('doing', this.doingColumnIndex)
    }
    if (status === 'done') {
      this.doneColumnIndex = this.doneColumnIndex + 1
      this.doneData = this.getColumnData('done', this.doneColumnIndex)
    }
  }
  backPage(status) {
    if (status === 'todo') {
      this.todoColumnIndex = this.todoColumnIndex - 1
      this.todoData = this.getColumnData('todo', this.todoColumnIndex)
    }
    if (status === 'doing') {
      this.doingColumnIndex = this.doingColumnIndex - 1
      this.doingData = this.getColumnData('doing', this.doingColumnIndex)
    }
    if (status === 'done') {
      this.doneColumnIndex = this.doneColumnIndex - 1
      this.doneData = this.getColumnData('done', this.doneColumnIndex)
    }

  }

  disableButton(status) {
    const pages = Math.ceil(this.getTasksByStatus(status).length / 5)

    if (status === 'todo') {
      return this.todoColumnIndex < pages - 1
    }
    if (status === 'doing') {
      return this.doingColumnIndex < pages - 1
    }
    return this.doneColumnIndex < pages - 1

  }

  scrollToEnd = (id) => {

    screen

  }

  addColumn() {
    this.customColumns.push({
      label: 'Custom Label'
    })
    this.scrollToEnd('board-content')
  }
}
