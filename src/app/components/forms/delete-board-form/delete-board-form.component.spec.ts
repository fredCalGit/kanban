import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardFormComponent } from './delete-board-form.component';

describe('DeleteBoardFormComponent', () => {
  let component: DeleteBoardFormComponent;
  let fixture: ComponentFixture<DeleteBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoardFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
