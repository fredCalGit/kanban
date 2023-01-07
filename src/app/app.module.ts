import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { BoardComponent } from './components/board/board.component';
import { NewTaskFormComponent } from './components/new-task-form/new-task-form.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './shared/input/input.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { EditTaskFormComponent } from './components/edit-task-form/edit-task-form.component';
import { ColumnComponent } from './column/column.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DropdownComponent,
    BoardComponent,
    NewTaskFormComponent,
    BoardFormComponent,
    EditTaskFormComponent,
    ColumnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
