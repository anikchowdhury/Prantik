import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomBookingComponent } from './add-room-booking.component';

describe('AddUserComponent', () => {
  let component: AddRoomBookingComponent;
  let fixture: ComponentFixture<AddRoomBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
