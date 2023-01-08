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
import { NewTaskFormComponent } from './components/forms/new-task-form/new-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './components/forms/board-form/board-form.component';
import { EditTaskFormComponent } from './components/forms/edit-task-form/edit-task-form.component';
import { ColumnComponent } from './components/column/column.component';
import { NgxRerenderModule } from 'ngx-rerender';
import { DeleteColumnFormComponent } from './components/forms/delete-column-form/delete-column-form.component';

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
    DeleteColumnFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxRerenderModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
