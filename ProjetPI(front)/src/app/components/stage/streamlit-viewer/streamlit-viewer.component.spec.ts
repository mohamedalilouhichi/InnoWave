import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamlitViewerComponent } from './streamlit-viewer.component';

describe('StreamlitViewerComponent', () => {
  let component: StreamlitViewerComponent;
  let fixture: ComponentFixture<StreamlitViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamlitViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamlitViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
