import { Injectable } from '@angular/core';
import { data } from './data'
import { Board, Task } from './models';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private boards: Board[]
  private activeBoardIndex: number = 0
  private dark: boolean
  constructor() {
    const dataJSON = JSON.stringify(data)

    const raw = localStorage.getItem('boards')
    if (!raw) {
      localStorage.setItem('boards', dataJSON)
    }
    this.boards = JSON.parse(raw) || []


    this.dark = false

  }
  getTheme(): boolean {
    return this.dark
  }
  setTheme(value) {
    this.dark = value
  }

  getActiveBoard() {
    return this.activeBoardIndex
  }

  setActiveBoard(index: number) {
    this.setActiveBoard(index)
  }

  updateData(data: Board[]) {
    const dataString = JSON.stringify(data)
    localStorage.setItem('boards', dataString)
    const raw = localStorage.getItem('boards')

    this.boards = JSON.parse(raw)
  }

  getAllBoards() {
    return this.boards
  }

  getAllBoardsTitles() {
    const titles = this.boards.map(board => {
      return board.name
    })
    return titles
  }

  getBoardById(id: string) {
    return this.boards.find(el => el.id === id) || null
  }

  getTasks(boardId: string) {
    const board = this.getBoardById(boardId)
    return board.tasks
  }

  addBoard(board: Board) {
    this.boards.push(board)
    this.updateData(this.boards)
  }
  refetch() {
    const raw = localStorage.getItem('boards')
    this.boards = JSON.parse(raw)
  }
  updateBoards(newBoard) {
    const idx = this.boards.indexOf(newBoard)
    this.boards[idx] = newBoard
    this.updateData(this.boards)
  }

  addTask(boardId: string, task: Task) {
    const board = this.getBoardById(boardId)
    board.tasks.push(task)
    this.updateBoards(board)
  }

  getTaskById(taskId: string) {
    const board = this.boards.find(el => el.tasks.find(task => task.id === taskId))
    const idx = board.tasks.indexOf(board.tasks.find(task => task.id === taskId))
    return board.tasks[idx]
  }

  deleteTask(taskId: string) {
    try {
      const board = this.boards.find(el => el.tasks.find(task => task.id === taskId))
      const idx = board.tasks.indexOf(board.tasks.find(task => task.id === taskId))
      board.tasks.splice(idx, 1)
      this.updateBoards(board)
    } catch (err) {
      throw new Error('Invalid taskId')
    }
  }

  deleteBoard(boardId: string) {
    const idx = this.boards.indexOf(this.getBoardById(boardId))
    this.boards.splice(idx, 1)
    this.updateData(this.boards)
  }
  updateTask(task: Task, boardId: string) {
    try {
      const board = this.getBoardById(boardId)
      const idx = board.tasks.indexOf(this.getTaskById(task.id))
      board.tasks[idx] = task
      this.updateBoards(board)
    } catch (err) {
      throw new Error('Invalid boardId')
    }
  }

  deleteColumn(boardId: string, index: number): void {
    try {
      const board = this.getBoardById(boardId)
      board.columns.splice(index, 1)
      this.updateBoards(board)
    } catch (err) {
      throw new Error('Invalid boardId')
    }
  }
  updateColumns(boardId: string, newColumns: { name: string }[]): void {
    try {
      const board = this.getBoardById(boardId)
      board.columns = newColumns
      this.updateBoards(board)
    } catch (err) {
      throw new Error('Invalid boardId')
    }
  }

}
