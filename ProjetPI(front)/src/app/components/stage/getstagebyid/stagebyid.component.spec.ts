import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagebyidComponent } from './stagebyid.component';

describe('StagebyidComponent', () => {
  let component: StagebyidComponent;
  let fixture: ComponentFixture<StagebyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagebyidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagebyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
