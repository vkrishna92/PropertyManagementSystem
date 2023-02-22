import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPaymentPeriodComponent } from './unit-payment-period.component';

describe('UnitPaymentPeriodComponent', () => {
  let component: UnitPaymentPeriodComponent;
  let fixture: ComponentFixture<UnitPaymentPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitPaymentPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitPaymentPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
