import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComComponent } from './add-com.component';

describe('AddComComponent', () => {
  let component: AddComComponent;
  let fixture: ComponentFixture<AddComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
