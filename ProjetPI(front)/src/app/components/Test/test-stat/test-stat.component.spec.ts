import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStatComponent } from './test-stat.component';

describe('TestStatComponent', () => {
  let component: TestStatComponent;
  let fixture: ComponentFixture<TestStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
