import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
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

  @Input() users: UserModel[];
  @Input() roomBookings: RoomBookingModel[];
  @Input() bookingCodeId: string;

  newUser: UserModel;
  closeResult: string;

  @ViewChild('userOperationContent') userOperationContentTpl: TemplateRef<any>;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService, private roomBookingService: RoomBookingService, private bookingDetailsUserService: BookingDetailsUserService) {
    this.newUser = {
      id: 0
    };
    this.users = [];
    this.roomBookings = [];
    this.bookingCodeId = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['myVal']);
      console.log(params['myAnotherVal']);
    });
  }

  onSubmit() {
    console.log('Submitted');
  }

  editUser(userToEdit: UserModel) {
    this.newUser = Object.assign({}, userToEdit);
    this.openModal(this.userOperationContentTpl);
  }

  deleteUser(userToDelete: UserModel) {
    console.log(userToDelete);
  }

  displayAddedRoom(roomBookingModel: RoomBookingModel) {
    this.roomBookings.push(roomBookingModel);
  }

  displayAddedUser(userModel: UserModel) {
    let userIndex = this.users.findIndex(user => user.id == userModel.id);
    if (userIndex > -1) {
      this.users[userIndex] = Object.assign({}, userModel);
      this.modalService.dismissAll("Updated User");
      this.newUser = {
        id: 0
      };
    }
    else
      this.users.push(userModel);
  }

  createBooking() {
    this.bookingDetailsService.PostBookingDetails()
      .subscribe((response: BookingDetailsModel) => {
        this.users.forEach((value) => {
          this.bookingDetailsUserService.PostBookingDetailsUser(
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

  openModal(content) {
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