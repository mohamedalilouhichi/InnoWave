import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetstageComponent } from './getstage.component';

describe('GetstageComponent', () => {
  let component: GetstageComponent;
  let fixture: ComponentFixture<GetstageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetstageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
