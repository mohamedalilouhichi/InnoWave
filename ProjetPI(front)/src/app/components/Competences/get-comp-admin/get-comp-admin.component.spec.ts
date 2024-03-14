import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompAdminComponent } from './get-comp-admin.component';

describe('GetCompAdminComponent', () => {
  let component: GetCompAdminComponent;
  let fixture: ComponentFixture<GetCompAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCompAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCompAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
