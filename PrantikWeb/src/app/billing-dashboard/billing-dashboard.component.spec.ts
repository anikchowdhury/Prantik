import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDashboardComponent } from './billing-dashboard.component';

describe('AddUserComponent', () => {
  let component: BillingDashboardComponent;
  let fixture: ComponentFixture<BillingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
