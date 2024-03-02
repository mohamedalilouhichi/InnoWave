import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackFrontComponent } from './list-feedback-front.component';

describe('ListFeedbackFrontComponent', () => {
  let component: ListFeedbackFrontComponent;
  let fixture: ComponentFixture<ListFeedbackFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeedbackFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedbackFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
