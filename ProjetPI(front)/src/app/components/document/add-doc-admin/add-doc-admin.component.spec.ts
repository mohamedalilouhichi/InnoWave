import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocAdminComponent } from './add-doc-admin.component';

describe('AddDocAdminComponent', () => {
  let component: AddDocAdminComponent;
  let fixture: ComponentFixture<AddDocAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDocAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
