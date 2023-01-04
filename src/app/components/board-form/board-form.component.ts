import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Board, SubTask, Task } from '../board/board.component';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent {
  newBoardForm: FormGroup

  @Input()
  board: Board
  dark: boolean
  columns: { name: string }[] = []
  validationError: boolean
  errorMessage: string

  @Output()
  showDialog = new EventEmitter()

  @Output() boardSubmit = new EventEmitter()

  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value

  }
  ngOnInit() {

    this.newBoardForm = new FormGroup<any>({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      column: new FormControl(''),
    })
  }

  validateForm() {
    this.validationError = this.newBoardForm.controls['name'].errors !== null

    if (this.validationError) {
      this.errorMessage = this.newBoardForm.controls['name'].errors?.['required'] === true ? 'Required' : 'Minimum length: 3 characters'
    } else {
      this.errorMessage = 'Required'
    }
  }

  showErrors() {
    const { dirty, touched, errors } = this.newBoardForm.controls['name']

    return dirty && touched && errors
  }

  onColumnsSubmit() {
    this.columns.push({
      name: this.newBoardForm.value['column']
    })
  }

  addColumn() {
    console.log(this.newBoardForm.value['column'])
    this.onColumnsSubmit()
    this.newBoardForm.value['column'] = null

    const input: HTMLInputElement = document.querySelector('#addColumn')
    input.value = ''
  }

  onSubmit() {
    this.validateForm()
    if (this.validationError) return

    const newBoard: Board = {
      id: uuid(),
      name: this.newBoardForm.value['name'],
      columns: this.columns,
      tasks: [],
    }

    this.boardSubmit.emit(newBoard)
    this.showDialog.emit(false)
  }

  handleDelete(index: number) {
    this.columns.splice(index, 1)
  }
}
