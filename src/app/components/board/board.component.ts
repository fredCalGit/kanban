import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input()
  isDark: boolean

  isEmpty: boolean = true
  showModal = false


  constructor(private dialogService: DialogService) {

  }

  openDialog() {
    this.showModal = true
  }

  closeDialog() {
    this.showModal = false
  }
}
