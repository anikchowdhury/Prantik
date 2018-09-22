import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomBookingModel } from '../../models/room-booking.model';
import { RoomBookingService } from '../../services/room-booking.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-room-booking',
  templateUrl: './add-room-booking.component.html',
  styleUrls: ['./add-room-booking.component.css'],
  providers: [RoomBookingService]
})

export class AddRoomBookingComponent implements OnInit {

  @Output() roomAddedSuccesfully: EventEmitter<RoomBookingModel> = new EventEmitter();
    
  @Input() roomBooking: RoomBookingModel;
  
  roomNumbersList: number[] = new Array(); 
    today : any;
  startDate : any;

  constructor(private modalService: NgbModal, private roomBookingService: RoomBookingService) {
    this.roomBooking = {
      id: 0,
      roomRoomNumber: 0,
      bookingStartDate: '',
      bookingEndDate: ''
    };
    this.roomNumbersList = [101, 102, 103, 104, 105, 106, 107, 108, 109,
      201, 202, 203, 204, 205, 206, 207, 208, 209,
      301, 302, 303, 304, 305, 306, 307, 308, 309,
      401, 402, 403, 404, 405, 406, 407, 408, 409];
  }

  ngOnInit() {
  }
    
  dateRange(){
      this.roomBooking.bookingEndDate=this.roomBooking.bookingStartDate;
      this.startDate = this.roomBooking.bookingStartDate;
  }

  addRoomBookingSubmit() {
      if(this.roomBooking.id == 0)
        this.roomBookingService.PostRoomBookings(this.roomBooking)
          .subscribe((response: RoomBookingModel) => {
            console.log(response);
            this.roomAddedSuccesfully.emit({
              id: response.id,
              roomRoomNumber: response.roomRoomNumber,
              bookingStartDate: response.bookingStartDate,
              bookingEndDate: response.bookingEndDate,
              amount: response.amount,
              gst: response.gst,
              createDate: response.createDate
            });
          },
            (err) => {
              console.log(err);
            });
      else
          this.roomBookingService.PutRoomBookings(this.roomBooking)
            .subscribe((response: void) => {
              this.roomAddedSuccesfully.emit(this.roomBooking);
            },
              (err) => {
                console.log(err);
              });
  }

}
