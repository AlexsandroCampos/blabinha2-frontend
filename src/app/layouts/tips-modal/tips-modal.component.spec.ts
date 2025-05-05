import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsModalComponent } from './tips-modal.component';

describe('TipsModalComponent', () => {
  let component: TipsModalComponent;
  let fixture: ComponentFixture<TipsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
