import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../services/models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input()
  name: string

  @Input()
  tasks: Task[]


  @Input()
  boardId: string


  @Input()
  dark: boolean

  @Output()
  taskToEdit = new EventEmitter()

  @Output()
  draggedCardEvent = new EventEmitter()

  editingTask: Task
  cardId: string
  columnIndex: number = 0

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

  }

  setTaskToEdit(task: Task) {
    this.editingTask = task
    this.taskToEdit.emit(this.editingTask)
  }

  nextPage() {
    this.columnIndex = this.columnIndex + 1
    this.tasks = this.getColumnData(this.columnIndex)
  }
  backPage() {
    this.columnIndex = this.columnIndex - 1
    this.tasks = this.getColumnData(this.columnIndex)
  }

  getColumnData(index) {
    return this.paginate(this.tasks, 5, index + 1)
  }

  paginate(array: any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  disableButton() {
    const pages = Math.ceil(this.tasks.length / 5)
    return this.columnIndex < pages - 1
  }

  deslugify(string: string) {
    let result = ''
    string.split('').forEach(el => {
      if (el !== '-') { result += el.toLowerCase() }
      else {
        result += ' '
      }
    })
    return result
  }
}
