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

  @Input()
  board: Board

  @Output()
  columnToDeleteIndex = new EventEmitter()

  @Output()
  taskToEdit = new EventEmitter<Task>()

  @Output()
  showDelete = new EventEmitter()



  isEmpty: boolean = false
  boardId: string
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

  displayCustomColumn = true
  displayButton = true
  customColumn: {
    label: string,
    status: string,
    tasks?: Task[]
  }

  targetColumnId: string
  draggedCardId: string
  targetColumn: string
  defaultColumns = [{ name: 'todo' }, { name: 'doing' }, { name: 'done' }]
  columns: { name: string }[]
  addColumnName = false
  columnName: string


  constructor(private dataService: DataService) {

    if (!this.board?.tasks) {
      this.isEmpty = false
    }
    this.isDark = this.dataService.getTheme()
  }

  ngOnInit() {

    this.boardId = this.board.id
    if (this.board.tasks.length > 0) {
      this.isEmpty = false
    } else {
      this.isEmpty = true
    }
    if (this.board.columns) {
      let newCols = this.dataService.getBoardById(this.boardId).columns
      this.columns = [...newCols]
    }
    if (!this.board.columns.length) {
      this.columns = [...this.defaultColumns]
    }
  }

  rerender(board: Board) {
    this.board = board
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


  addColumn() {
    if (this.customColumn) {
      this.customColumn = {
        label: this.customColumn.label,
        status: this.customColumn.status,
        tasks: this.customColumn.tasks
      }
    } else {

      this.customColumn = {
        label: 'Custom',
        status: 'custom',
        tasks: this.getTasksByStatus('custom'),
      }
    }
    this.columns.push({ name: this.customColumn.status })
    this.dataService.updateColumns(this.boardId, this.columns)
    this.board.columns = this.columns
    this.dataService.updateBoards(this.board)
    this.displayCustomColumn = true
    this.displayButton = true
  }

  setTaskToEdit(task: Task) {
    this.editingTask = task
    this.taskToEdit.emit(this.editingTask)
  }

  handleEditEvent(event) {
    this.taskToEdit.emit(event)
  }

  handleDeleteColumn(index) {
    this.columnToDeleteIndex.emit(index)
    this.showDelete.emit()
  }

  drag(event) {
    event.dataTransfer.setData('cardId', event.target.id)
    this.draggedCardId = event.target.id
  }

  drop(event) {
    event.preventDefault()
    let data = event.dataTransfer.getData('cardId')
    if (data !== null) {
      document.querySelector(`#${event.target.id}-cards`).appendChild(document.getElementById(data))
      document.getElementById(event.target.id).style.border = 'none'
      const task = this.dataService.getTaskById(this.draggedCardId)
      task.status = event.target.id
      task.column = event.target.id
      this.dataService.updateTask(task, this.boardId)
      this.board = this.dataService.getBoardById(this.boardId)
    }
    return
  }

  dragStart(event) {
    document.getElementById(event.path[3].id).style.border = 'none'
  }

  dragLeave(event) {
    const column = document.getElementById(event.path[0].id)
    if (column) {
      column.style.border = 'none'
      column.style.borderRadius = '0'
    }
  }
  dragOver(event) {
    event.preventDefault()
    const column = document.getElementById(event.path[0].id)
    if (column && !event.path[0].id.includes('card')) {
      column.style.border = '1px solid #635fc7'
      column.style.borderRadius = '6px'
    }
  }
  slugify(string: string) {
    let result = ''
    string.split('').forEach(el => {
      if (el !== ' ') { result += el.toLowerCase() }
      else {
        result += '-'
      }
    })
    return result
  }

  toggleColumnName() {
    this.addColumnName = true
  }

  columnNameInputChange(event) {
    const target = event.target as HTMLInputElement
    this.columnName = target.value
  }
  cancelColumnName(event) {
    event.stopPropagation()
    this.addColumnName = false
  }
  handleClick(event) {
    const content = document.querySelector('#board-container')
    content.scrollLeft -= 10000
    event.preventDefault()
  }
  onSubmit() {
    this.columns.push({ name: this.slugify(this.columnName) })
    this.columnName = ''
    this.addColumnName = false
    this.board.columns = this.columns
    this.dataService.updateColumns(this.board.id, this.columns)
    this.dataService.updateBoards(this.board)
    const content = document.querySelector('#board-container')
    content.scrollLeft -= 500
  }
}
