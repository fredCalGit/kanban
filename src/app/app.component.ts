import { Component, SimpleChange, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { v4 as uuid } from 'uuid'
import { DataService } from './services/data.service';
import { Board, Task } from './services/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDark: boolean
  hideSidebar: boolean = false
  enableDropdown: boolean
  boards: Board[]
  titles: {
    id: string,
    title: string
  }[]
  activeBoardIndex: number = 0
  activeBoardId: string
  activeBoard: Board
  boardsTitles: string[]
  boardName: string
  showModal = false
  showBoardModal = false
  showColumnModal = false
  showEditTask = false
  showColumnDeleteModal = false
  showBoardDeleteModal = false
  taskToEdit: Task
  columns: { name: string }[]
  columnToDeleteIndex: number


  constructor(private dataService: DataService) {
    this.isDark = this.dataService.getTheme()

  }

  ngOnInit() {

    this.boards = this.dataService.getAllBoards()
    this.activeBoardId = this.boards[this.activeBoardIndex].id
    this.activeBoard = this.dataService.getBoardById(this.activeBoardId)
    this.boardName = this.boards[this.activeBoardIndex].name
    this.boardsTitles = this.dataService.getAllBoardsTitles()
  }

  rerender(board: Board) {
    this.activeBoard = board
  }

  getActiveBoard() {
    return this.activeBoard
  }
  onToggleSidebar() {
    this.hideSidebar = !this.hideSidebar
  }
  handleThemeChangeEvent(event: boolean) {
    this.isDark = event
    localStorage.setItem('theme', JSON.stringify({ value: event }))
  }
  handleToggleSidebarChangeEvent(event: boolean) {
    this.hideSidebar = event
  }
  handleToggleDropdownEvent(event: boolean) {
    this.hideSidebar = !event
  }
  handleOpenDialog() {
    this.showModal = true
  }
  handleOpenBoardDialog() {
    this.showBoardModal = true
  }
  handleOpenDeleteColumnDialog(event) {
    this.showColumnDeleteModal = true
  }
  handleOpenDeleteBoard() {
    this.showBoardDeleteModal = true
  }
  handleBoardSelect(event: { value: number }) {
    this.boards = this.dataService.getAllBoards()
    this.activeBoardIndex = event.value
    this.activeBoardId = this.boards[this.activeBoardIndex].id
    this.boardName = this.boards[this.activeBoardIndex].name
    this.rerender(this.boards[this.activeBoardIndex])
  }
  handleDeleteBoard(event) {
    this.dataService.deleteBoard(this.activeBoardId)
    this.boards = this.dataService.getAllBoards()
    this.activeBoardIndex = 0
    if (this.boards.length > 0) {

      this.activeBoard = this.boards[this.activeBoardIndex]
      this.boardName = this.activeBoard.name
      this.activeBoardId = this.boards[this.activeBoardIndex].id
    } else {
      this.activeBoard = null
      this.activeBoardId = null
      this.boardName = null
      this.activeBoardIndex = null
    }
    this.boardsTitles = this.dataService.getAllBoardsTitles()
    this.showBoardDeleteModal = false
    this.rerender(this.boards[this.activeBoardIndex])


  }
  handleEditBoard(event) {
    console.log(this.activeBoard)
  }
  openDialog() {
    this.showModal = true
  }
  closeDialog() {
    this.showModal = false
  }
  closeBoardDialog() {
    this.showBoardModal = false
    this.boards = this.dataService.getAllBoards()
  }

  closeColumnDialog() {
    this.showColumnModal = false
    this.boards = this.dataService.getAllBoards()
  }

  closeDeleteColumn() {

    this.showColumnDeleteModal = false
    this.boards = this.dataService.getAllBoards()
  }
  closeDeleteBoard() {

    this.showBoardDeleteModal = false
    this.boards = this.dataService.getAllBoards()
  }

  closeEditTask() {

    this.boards = this.dataService.getAllBoards()
    this.showEditTask = false
  }

  handleAddBoard(board) {
    this.dataService.addBoard(board)
    this.boards = this.dataService.getAllBoards()
    this.boardsTitles = this.dataService.getAllBoardsTitles()
    this.activeBoard = board
    this.activeBoardId = board.id
    this.boardName = this.activeBoard.name
    this.activeBoardIndex = this.boards.length - 1
    this.handleBoardSelect({ value: this.activeBoardIndex })
  }

  handleTaskSubmit(task: Task) {
    this.dataService.addTask(this.activeBoardId, task)
    this.boards = this.dataService.getAllBoards()
    this.activeBoard = this.dataService.getBoardById(this.activeBoardId)
  }

  handleTaskEditSubmit(task: Task) {
    this.dataService.updateTask(task, this.activeBoardId)
    this.boards = this.dataService.getAllBoards()
    this.activeBoard = this.dataService.getBoardById(this.activeBoardId)
    this.showEditTask = false

  }

  handleTaskToEdit(task: Task) {
    this.taskToEdit = task
    this.showEditTask = true
  }

  handleAddColumn(column) {
    this.columns.push(column)
    this.dataService.updateColumns(this.activeBoard.id, this.columns)
    this.activeBoard = this.dataService.getBoardById(this.activeBoard.id)
  }

  handleDeleteColumn() {
    this.dataService.deleteColumn(this.activeBoardId, this.columnToDeleteIndex)
    this.boards = this.dataService.getAllBoards()
    this.activeBoard = this.dataService.getBoardById(this.activeBoardId)
    this.showColumnDeleteModal = false
  }
  setColumnToDelete(event) {
    this.columnToDeleteIndex = event
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
  deslugify(string: string): string {
    let result = ''
    string.split('').forEach(el => {
      if (el !== '-') { result += el.toLowerCase() }
      else {
        result += ' '
      }
    })
    return result
  }
  getColumns() {
    const cols = this.activeBoard.columns
    const options = cols.map(el => {
      return {
        value: this.slugify(el.name),
        label: this.deslugify(el.name),
      }
    })
    return options
  }
}
