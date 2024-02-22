import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanningComponent } from './show-planning.component';

describe('ShowPlanningComponent', () => {
  let component: ShowPlanningComponent;
  let fixture: ComponentFixture<ShowPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
