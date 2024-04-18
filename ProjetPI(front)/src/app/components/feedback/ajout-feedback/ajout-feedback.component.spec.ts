import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFeedbackComponent } from './ajout-feedback.component';

describe('AjoutFeedbackComponent', () => {
  let component: AjoutFeedbackComponent;
  let fixture: ComponentFixture<AjoutFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
