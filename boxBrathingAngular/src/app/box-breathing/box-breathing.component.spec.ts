import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxBreathingComponent } from './box-breathing.component';

describe('BoxBreathingComponent', () => {
  let component: BoxBreathingComponent;
  let fixture: ComponentFixture<BoxBreathingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxBreathingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxBreathingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
