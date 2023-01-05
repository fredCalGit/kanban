import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isSelected: boolean = false
  @Output()
  boardIndex = new EventEmitter()
  activeTab = 0

  @Input()
  boards: string[]

  @Input()
  hideBar: boolean = false

  @Input()
  dark: boolean

  @Output()
  isHidden = new EventEmitter()

  @Output()
  isDark = new EventEmitter()

  showBoardModal = false
  @Output()
  openBoard = new EventEmitter()

  constructor(private dataService: DataService) {

    const storage = localStorage.getItem('theme')
    if (storage === null) {
      localStorage.setItem('theme', JSON.stringify({ value: false }))
    } else {
      const storage = localStorage.getItem('theme')
      const { value } = JSON.parse(storage)
      this.dark = value
    }
  }



  toggleDarkEvent(event: boolean) {
    const storage = localStorage.getItem('theme')
    if (storage) {
      localStorage.setItem('theme', JSON.stringify({ value: event }))
    }
    this.dark = event
    this.isDark.emit(event)
  }

  toggleBar() {
    this.hideBar = !this.hideBar
    this.isHidden.emit(this.hideBar)
  }

  onClick(event: Event) {
    event.stopPropagation()
  }

  onSelect(index: number) {
    this.activeTab = index
    this.boardIndex.emit({ value: index })
  }

  openBoardDialog(event) {
    event.stopPropagation()
    this.showBoardModal = true
    this.openBoard.emit(true)
  }
}
