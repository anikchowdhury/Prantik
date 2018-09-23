import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomBookingModel } from '../../models/room-booking.model';
import { RoomBookingService } from '../../services/room-booking.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RoomNumbersConstant } from '../../constants/master-data.constant';


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
    this.roomNumbersList = RoomNumbersConstant;
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
