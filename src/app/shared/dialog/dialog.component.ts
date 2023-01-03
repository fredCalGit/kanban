import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

})
export class DialogComponent {
  @Input()
  ngClass: string[]
  @Output() dismiss = new EventEmitter()

  @Input()
  dark: boolean
  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement)
    const storage = localStorage.getItem('theme')
    if (storage) {
      this.dark = JSON.parse(storage).value
    }
  }

  ngOnDestroy() {
    this.el.nativeElement.remove()
  }

  onDismissClick() {
    this.dismiss.emit()
  }
}
