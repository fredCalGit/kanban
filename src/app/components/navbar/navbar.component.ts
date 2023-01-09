import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input()
  dark: boolean

  @Input()
  hasSidebar: boolean

  @Input()
  boardName: string

  showDropdown = false

  @Output()
  displayDropdown = new EventEmitter<boolean>()

  @Output()
  openDialog = new EventEmitter<boolean>()

  @Output()
  deleteBoard = new EventEmitter()

  @Output()
  editBoard = new EventEmitter()

  isMobile: boolean
  rotate = false
  constructor(private dataService: DataService) {
    this.dark = this.dataService.getTheme()
    this.isMobile = screen.width < 600
  }

  addTask() {
    this.openDialog.emit(true)
  }

  closeDropdown() {
    this.showDropdown = false
    this.displayDropdown.emit(false)
  }
  openDropdown() {
    this.showDropdown = true
    this.displayDropdown.emit(true)
  }

  toggleDropdown() {
    this.rotate = !this.rotate
    this.showDropdown === true ? this.closeDropdown() : this.openDropdown()
    console.log('navbar state', this.showDropdown)
  }

  handleDeleteBoard() {
    this.deleteBoard.emit(true)
  }
  handleEditBoard() {
    this.editBoard.emit(true)
  }




}
