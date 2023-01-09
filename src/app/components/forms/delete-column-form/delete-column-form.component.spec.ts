import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColumnFormComponent } from './delete-column-form.component';

describe('DeleteColumnFormComponent', () => {
  let component: DeleteColumnFormComponent;
  let fixture: ComponentFixture<DeleteColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteColumnFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
