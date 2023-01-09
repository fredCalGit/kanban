import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Board } from 'src/app/services/models';
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

  @Input()
  dark: boolean
  columns: { name: string }[] = []
  defaultColumns: { name: string }[] = [
    { name: 'todo' },
    { name: 'doing' },
    { name: 'done' },
  ]
  initialColumns: { name: string }[] = []
  validationError: boolean
  errorMessage: string

  @Output()
  showDialog = new EventEmitter()

  @Output()
  boardSubmit = new EventEmitter()

  constructor(private dataService: DataService) {


  }
  ngOnInit() {

    this.newBoardForm = new FormGroup<any>({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      column: new FormControl(''),
    })

    this.columns = [...this.defaultColumns, ...this.columns]
    this.dark = this.dataService.getTheme()
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
      name: this.slugify(this.newBoardForm.value['column'])
    })
  }

  addColumn() {
    this.onColumnsSubmit()
    this.newBoardForm.value['column'] = null

    const input: HTMLInputElement = document.querySelector('#addColumn')
    input.value = ''
    console.log(this.columns)
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
}
