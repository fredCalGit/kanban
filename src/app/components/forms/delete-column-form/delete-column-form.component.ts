import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-column-form',
  templateUrl: './delete-column-form.component.html',
  styleUrls: ['./delete-column-form.component.css']
})
export class DeleteColumnFormComponent {
  @Input()
  dark: string

  @Input()
  columnName: string

  @Output()
  deleteConfirmation = new EventEmitter()

  @Output()
  closeDelete = new EventEmitter()

  constructor() {
    this.dark = JSON.parse(localStorage.getItem('theme')).value
  }

  handleCancel() {
    this.closeDelete.emit()
  }

  handleConfirm() {
    this.deleteConfirmation.emit()
  }
}
