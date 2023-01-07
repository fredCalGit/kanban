import { Component, SimpleChange } from '@angular/core';
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
  showEditTask = false

  taskToEdit: Task

  constructor(private dataService: DataService) {
    this.boards = this.dataService.getAllBoards()
    this.activeBoardId = this.boards[this.activeBoardIndex].id
    this.activeBoard = this.dataService.getBoardById(this.activeBoardId)
    this.boardName = this.boards[this.activeBoardIndex].name
    this.boardsTitles = this.dataService.getAllBoardsTitles()
  }

  ngOnInit() {
    const storage = localStorage.getItem('theme')
    if (storage === null) {
      localStorage.setItem('theme', JSON.stringify({ value: this.isDark }))
    } else {
      const storage = localStorage.getItem('theme')
      const { value } = JSON.parse(storage)
      this.isDark = value
    }
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
    this.enableDropdown = event
  }

  handleOpenDialog() {
    this.showModal = true
  }
  handleOpenBoardDialog() {
    this.showBoardModal = true
  }

  handleBoardSelect(event: { value: number }) {
    this.boards = this.dataService.getAllBoards()
    this.activeBoardIndex = event.value
    this.activeBoard = this.boards[this.activeBoardIndex]
    this.activeBoardId = this.boards[this.activeBoardIndex].id
    this.boardName = this.boards[this.activeBoardIndex].name
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

  closeEditTask() {

    this.boards = this.dataService.getAllBoards()
    this.showEditTask = false
  }

  handleAddBoard(board) {
    this.dataService.addBoard(board)
    this.boardsTitles = this.dataService.getAllBoardsTitles()
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

}
