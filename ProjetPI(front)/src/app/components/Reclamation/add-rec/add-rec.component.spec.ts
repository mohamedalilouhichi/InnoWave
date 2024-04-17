import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecComponent } from './add-rec.component';

describe('AddRecComponent', () => {
  let component: AddRecComponent;
  let fixture: ComponentFixture<AddRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
