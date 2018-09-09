import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RoomBookingModel } from '../../models/room-booking.model';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';
import { BookingDetailsUserService } from '../../services/booking-details-user.service';
import { BookingDetailsUserModel } from '../../models/booking-details-user.model';
import { RoomBookingService } from '../../services/room-booking.service';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
  providers: [BookingDetailsService, BookingDetailsUserService, RoomBookingService]
})
export class BillingDashboardComponent implements OnInit {
  user: UserModel;
  users: UserModel[];
  roomBookings: RoomBookingModel[];
  closeResult: string;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService,
    private roomBookingService: RoomBookingService, private bookingDetailsUserService: BookingDetailsUserService) {
    this.user = {
      name: '',
      address: ''
    };
    this.users = [];
    this.roomBookings = [];
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params['myVal']);
      console.log(params['myAnotherVal']);
    });
    /* this.userService.GetAllUsers()
       .subscribe((response: UserModel[]) => {
         console.log(response);
       },
         (err) => {
           console.log(err);
           console.log('Inside Subscribe');
       });*/
  }

  onSubmit() {
    console.log('Submitted');
  }



  displayAddedRoom(roomBookingModel: RoomBookingModel) {
    console.log('Received');
    console.log(roomBookingModel);
    this.roomBookings.push(roomBookingModel);
  }

  displayAddedUser(userModel: UserModel) {
    console.log(userModel);
    this.users.push(userModel);
  }

  createBooking() {
    this.bookingDetailsService.PostRoomBookings()
      .subscribe((response: BookingDetailsModel) => {
        this.users.forEach((value) => {
          this.bookingDetailsUserService.PostRoomBookings(
            {
              bookingDetailsId: response.id,
              userId: value.id
            }).subscribe((bookingDetailsUserResponse: BookingDetailsUserModel) => {
            },
              (err) => {
                console.log(err);
              });
        });
        this.roomBookings.forEach((value) => {
          console.log(value);
          value.bookingDetailsId = response.id;
          this.roomBookingService.PutRoomBookings(value)
            .subscribe((roomBookingResponse: void) => {
            },
              (err) => {
                console.log(err);
              });
        });
      },
        (err) => {
          console.log(err);
        });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {
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