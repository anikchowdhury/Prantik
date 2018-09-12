import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  roomBookingModel: RoomBookingModel;
  roomNumbersList: number[] = new Array(); 
    today : any;
  startDate : any;

  constructor(private modalService: NgbModal, private roomBookingService: RoomBookingService) {
    this.roomBookingModel = {
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
      this.roomBookingModel.bookingEndDate=this.roomBookingModel.bookingStartDate;
      this.startDate = this.roomBookingModel.bookingStartDate;
  }

  addRoomBookingSubmit() {
    this.roomBookingService.PostRoomBookings(this.roomBookingModel)
      .subscribe((response: RoomBookingModel) => {
        this.roomAddedSuccesfully.emit({
          id: response.id,
          roomRoomNumber: response.roomRoomNumber,
          bookingStartDate: response.bookingStartDate,
          bookingEndDate: response.bookingEndDate,
          amount: response.amount
        });
      },
        (err) => {
          console.log(err);
        });
  }

  closeResult: string;

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
