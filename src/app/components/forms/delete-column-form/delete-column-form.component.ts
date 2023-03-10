import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete-column-form',
  templateUrl: './delete-column-form.component.html',
  styleUrls: ['./delete-column-form.component.css']
})
export class DeleteColumnFormComponent {
  @Input()
  dark: boolean

  @Output()
  deleteConfirmation = new EventEmitter()

  @Output()
  closeDelete = new EventEmitter()

  constructor(private dataService: DataService) {
    this.dark = this.dataService.getTheme()
  }

  handleCancel() {
    this.closeDelete.emit()
  }

  handleConfirm() {
    this.deleteConfirmation.emit()
  }
}
