import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseModalComponent } from './phase-modal.component';

describe('PhaseModalComponent', () => {
  let component: PhaseModalComponent;
  let fixture: ComponentFixture<PhaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
