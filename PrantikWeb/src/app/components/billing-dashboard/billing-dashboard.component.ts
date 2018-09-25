import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RoomBookingModel } from '../../models/room-booking.model';
import { PaymentModel } from '../../models/payment.model';
import { FoodOrderModel } from '../../models/food-order.model';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';
import { BookingDetailsUserService } from '../../services/booking-details-user.service';
import { BookingDetailsUserModel } from '../../models/booking-details-user.model';
import { RoomBookingService } from '../../services/room-booking.service';
import { PaymentService } from '../../services/payment.service';
import { FoodOrderService } from '../../services/food-order.service';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
  providers: [BookingDetailsService, BookingDetailsUserService, RoomBookingService, PaymentService, FoodOrderService]
})
export class BillingDashboardComponent implements OnInit {

  @Input() users: UserModel[];
  @Input() roomBookings: RoomBookingModel[];
  @Input() bookingCodeId: number;
  @Input() payments: PaymentModel[];
  @Input() foodOrders: FoodOrderModel[];
  @Input() bookingCodeToDisplay: string;

  newUser: UserModel;
  newRoomBooking: RoomBookingModel;
  newPayment: PaymentModel;
  newFoodOrder: FoodOrderModel;
  closeResult: string;
  isProcessingCreateBooking: boolean;


  @ViewChild('userOperationContent') userOperationContentTpl: TemplateRef<any>;
  @ViewChild('addRoomBookingContent') roomBookingOperationContentTpl: TemplateRef<any>;
  @ViewChild('addPayment') paymentOperationContentTpl: TemplateRef<any>;
  @ViewChild('addFoodOrder') foodOrderOperationContentTpl: TemplateRef<any>;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService, private roomBookingService: RoomBookingService, private paymentService: PaymentService, private foodOrderService: FoodOrderService, private bookingDetailsUserService: BookingDetailsUserService) {
    this.setBlankPayment();
    this.setBlankUser();
    this.setBlankRoomBooking();
    this.setBlankFoodOrder();
    this.users = [];
    this.roomBookings = [];
    this.bookingCodeId = 0;
    this.payments = [];
    this.foodOrders = [];
    this.bookingCodeToDisplay = '';
    this.isProcessingCreateBooking = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['myVal']);
      console.log(params['myAnotherVal']);
    });
  }

  editUser(userToEdit: UserModel) {
    this.newUser = Object.assign({}, userToEdit);
    this.openModal(this.userOperationContentTpl);
  }

  editFoodOrder(foodOrderToEdit: FoodOrderModel) {
    this.newFoodOrder = Object.assign({}, foodOrderToEdit);
    this.openModal(this.foodOrderOperationContentTpl);
  }

  editRoomBooking(roomBookingToEdit: RoomBookingModel) {
    this.newRoomBooking = Object.assign({}, roomBookingToEdit);
    this.openModal(this.roomBookingOperationContentTpl);
  }

  editPayment(paymentToEdit: PaymentModel) {
    console.log(paymentToEdit);
    this.newPayment = Object.assign({}, paymentToEdit);
    this.openModal(this.paymentOperationContentTpl);
  }

  deleteUser(userToDelete: UserModel) {
    console.log(userToDelete);
  }

  deleteFoodOrder(foodOrderToDelete: FoodOrderModel) {
    console.log(foodOrderToDelete);
  }

  deleteRoomBooking(roomBookingToDelete: RoomBookingModel) {
    console.log(roomBookingToDelete);
  }

  deletePayment(paymentToDelete: PaymentModel) {
    console.log(paymentToDelete);
  }

  displayAddedRoom(roomBookingModel: RoomBookingModel) {
    let roomBookingIndex = this.roomBookings.findIndex(roomBooking => roomBooking.id == roomBookingModel.id);
    if (roomBookingIndex > -1) {
      this.roomBookings[roomBookingIndex] = Object.assign({}, roomBookingModel);
      this.setBlankRoomBooking();
      this.modalService.dismissAll("Updated Room Booking");
    }
    else
      this.roomBookings.push(roomBookingModel);
  }

  displayAddedPayment(paymentModel: PaymentModel) {
    let paymentIndex = this.payments.findIndex(payment => payment.id == paymentModel.id);
    if (paymentIndex > -1) {
      this.payments[paymentIndex] = Object.assign({}, paymentModel);
      this.setBlankPayment();
      this.modalService.dismissAll("Updated Room Booking");
    }
    else
      this.payments.push(paymentModel);
  }

  displayAddedUser(userModel: UserModel) {
    let userIndex = this.users.findIndex(user => user.id == userModel.id);
    if (userIndex > -1) {
      this.users[userIndex] = Object.assign({}, userModel);
      this.setBlankUser();
      this.modalService.dismissAll("Updated User");
    }
    else {
      this.users.push(userModel);
      if (this.bookingCodeId > 0) this.addBookingDetailsUser(this.bookingCodeId, userModel.id);
    }
  }

  displayAddedFoodOrder(foodModel: FoodOrderModel) {
    console.log(foodModel);
    let foodOrderIndex = this.foodOrders.findIndex(foodOrder => foodOrder.id == foodModel.id);
    if (foodOrderIndex > -1) {
      this.foodOrders[foodOrderIndex] = Object.assign({}, foodModel);
      this.setBlankFoodOrder();
      this.modalService.dismissAll("Updated Room Booking");
    }
    else
      this.foodOrders.push(foodModel);
  }

  createBooking() {
    this.isProcessingCreateBooking = true;
    console.log(this.roomBookings);
    this.bookingDetailsService.PostBookingDetails()
      .subscribe((response: BookingDetailsModel) => {
        this.users.forEach((value) => {
          this.addBookingDetailsUser(response.id, value.id);
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
        this.payments.forEach((value) => {
          value.bookingDetailsId = response.id;
          this.paymentService.PutPayment(value)
            .subscribe((paymentResponse: void) => {
            },
              (err) => {
                console.log(err);
              });
        });
        this.foodOrders.forEach((value) => {
          value.bookingDetailsId = response.id;
          this.foodOrderService.PutFoodOrder(value)
            .subscribe((foodOrderResponse: void) => {

            },
              (err) => {
                console.log(err);
              });
        });
        this.bookingCodeId = response.id;
        this.bookingCodeToDisplay = response.bookingCode;
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

  setBlankUser() {
    this.newUser = {
      id: 0
    };
  }

  setBlankRoomBooking() {

    this.newRoomBooking = {
      id: 0,
      bookingDetailsId: this.bookingCodeId
    };
  }

  setBlankPayment() {
    this.newPayment = {
      id: 0,
      bookingDetailsId: this.bookingCodeId
    };
  }

  setBlankFoodOrder() {
    this.newFoodOrder = {
      id: 0,
      bookingDetailsId: this.bookingCodeId
    };
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

  private addBookingDetailsUser(bookingId: number, userId: number): void {
    this.bookingDetailsUserService.PostBookingDetailsUser(
      {
        bookingDetailsId: bookingId,
        userId: userId
      }).subscribe((bookingDetailsUserResponse: BookingDetailsUserModel) => {
      },
        (err) => {
          console.log(err);
        });
  }
}