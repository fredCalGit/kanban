import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete-board-form',
  templateUrl: './delete-board-form.component.html',
  styleUrls: ['./delete-board-form.component.css']
})
export class DeleteBoardFormComponent {
  @Input()
  dark: boolean

  @Input()
  boardName: string

  @Output()
  deleteConfirmation = new EventEmitter()

  @Output()
  closeDelete = new EventEmitter()

  constructor(private dataService: DataService) {

  }
  ngOnInit() {
    this.dark = this.dataService.getTheme()
  }

  handleCancel() {
    this.closeDelete.emit()
  }

  handleConfirm() {
    this.deleteConfirmation.emit()
  }
}
