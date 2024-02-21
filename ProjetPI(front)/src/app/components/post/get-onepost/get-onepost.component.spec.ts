import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOnepostComponent } from './get-onepost.component';

describe('GetOnepostComponent', () => {
  let component: GetOnepostComponent;
  let fixture: ComponentFixture<GetOnepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOnepostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOnepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
