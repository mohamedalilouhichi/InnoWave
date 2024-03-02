import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackBackOfficeComponent } from './add-feedback-back-office.component';

describe('AddFeedbackBackOfficeComponent', () => {
  let component: AddFeedbackBackOfficeComponent;
  let fixture: ComponentFixture<AddFeedbackBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedbackBackOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
