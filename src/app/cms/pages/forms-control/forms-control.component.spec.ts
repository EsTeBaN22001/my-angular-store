import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsControlComponent } from './forms-control.component';

describe('FormsControlComponent', () => {
  let component: FormsControlComponent;
  let fixture: ComponentFixture<FormsControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsControlComponent]
    });
    fixture = TestBed.createComponent(FormsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
