import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatureFrontComponent } from './list-candidature-front.component';

describe('ListCandidatureFrontComponent', () => {
  let component: ListCandidatureFrontComponent;
  let fixture: ComponentFixture<ListCandidatureFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidatureFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCandidatureFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
