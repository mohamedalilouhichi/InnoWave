import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCompComponent } from './pop-up-comp.component';

describe('PopUpCompComponent', () => {
  let component: PopUpCompComponent;
  let fixture: ComponentFixture<PopUpCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
