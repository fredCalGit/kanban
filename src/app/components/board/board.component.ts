import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Board, Task } from 'src/app/services/models';
import { v4 as uuid } from 'uuid'
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
  boardId: string

  @Input()
  board: Board

  @Output()
  taskToEdit = new EventEmitter<Task>()

  tasks: Task[]
  editingTask: Task
  paginatedTasks: Task[][]

  todoColumnIndex: number = 0
  doingColumnIndex: number = 0
  doneColumnIndex: number = 0
  customColumnIndex: number = 0

  todoData: Task[]
  doingData: Task[]
  doneData: Task[]
  customData: Task[]

  displayCustomColumn = false
  customColumn: {
    label: string,
    status: string,
    tasks?: Task[]
  }

  targetColumnId: string
  draggedCardId: string
  targetColumn: string
  columns = ['todo', 'doing', 'done', 'custom']
  constructor(private dataService: DataService) {

    if (!this.board?.tasks) {
      this.isEmpty = true
    }
  }

  ngOnInit() {
    this.board = this.dataService.getBoardById(this.boardId)

    if (this.board?.tasks) {
      this.isEmpty = false
    } else {
      this.isEmpty = true
    }
    if (this.board) {
      this.tasks = this.dataService.getTasks(this.boardId)
    }
    if (this.tasks.length === 0) {
      this.isEmpty = true
    }

  }

  getColumnData(status: string, index) {

    return this.paginate(this.getTasksByStatus(status), 5, index + 1)
  }

  paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  getTasksByStatus(status: string) {
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
    if (status === 'custom') {
      this.customColumnIndex = this.customColumnIndex + 1
      this.customData = this.getColumnData('custom', this.customColumnIndex)
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
    if (status === 'custom') {
      this.customColumnIndex = this.customColumnIndex - 1
      this.customData = this.getColumnData('custom', this.customColumnIndex)
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
    if (status === 'custom') {
      return this.customColumnIndex < pages - 1
    }
    return this.doneColumnIndex < pages - 1

  }

  addColumn() {
    this.customColumn = {
      label: 'New Column',
      status: 'custom',
      tasks: this.getTasksByStatus('custom'),
    }
    this.displayCustomColumn = true
  }

  setTaskToEdit(task: Task) {
    this.editingTask = task
    this.taskToEdit.emit(this.editingTask)
  }

  allowDrop(event) {
    event.preventDefault()
  }
  drag(event) {
    event.dataTransfer.setData('cardId', event.target.id)
    this.draggedCardId = event.target.id
    console.log(this.draggedCardId)
  }

  drop(event) {
    event.preventDefault()
    const task = this.dataService.getTaskById(this.draggedCardId)
    console.log('task', task)
    task.status = event.target.id
    this.dataService.updateTask(task, this.boardId)

    let data = event.dataTransfer.getData('cardId')
    document.querySelector(`#${event.target.id}-cards`).appendChild(document.getElementById(data))
  }
}
