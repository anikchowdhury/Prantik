import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RoomBookingModel } from '../../models/room-booking.model';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodOrderModel } from '../../models/food-order.model';

@Component({
    templateUrl: './bill-print.component.html',
    styleUrls: ['./bill-print.component.scss'],
    providers: [BookingDetailsService]
})
export class BillPrintComponent implements OnInit {

    @ViewChild('billerSelect') selectUserModal: TemplateRef<any>

    roomBookings: RoomBookingModel[];
    foodOrders: FoodOrderModel[];
    users: UserModel[];
    customerDetail: UserModel;
    totalAmount: number;
    qrValue: string;
    isRoomBillPrint: string;
    gstTotal: number;

    constructor(private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService, private modalService: NgbModal) {
        this.roomBookings = [];
        this.foodOrders = [];
        this.totalAmount = 0;
        this.gstTotal = 0;
        this.qrValue = '';
        this.customerDetail = {
            name: '',
            address: '',
            phoneNumber: '',
            comingFrom: ''
        };
        this.users = [];
        this.isRoomBillPrint = '';
    }
    ngOnInit() {
        this.route.params.subscribe(param => {
            this.isRoomBillPrint = param['isRoomBillPrint'];
            this.bookingDetailsService.GetBookingDetails(param['bookingCode'])
                .subscribe((response: BookingDetailsModel) => {
                    this.users = response.users;
                    this.openModal(this.selectUserModal);
                    if (this.isRoomBillPrint == 'true') {
                        this.roomBookings = response.rooms;
                        this.roomBookings.forEach((value) => {
                            this.totalAmount += value.amount;
                            this.gstTotal += value.gst;
                        });
                    }
                    else if (this.isRoomBillPrint == 'false')  {
                        console.log('inside food');
                        this.foodOrders = response.foodOrders;
                        this.foodOrders.forEach((value) => {
                            this.totalAmount += value.quantity * value.price;
                        });
                    }
                    this.qrValue = response.bookingCode;
                },
                    (err) => {
                        console.log(err);
                    });
        });
        /* this.route.paramMap.pipe(
            switchMap((params: Params) =>
                this.bookingDetailsService.GetBookingDetails(params.get('bookingCode'))
            )).subscribe((response: BookingDetailsModel) => {
                this.users = response.users;
                this.openModal(this.selectUserModal);
                this.roomBookings = response.rooms;
                this.roomBookings.forEach((value) => {
                    this.totalAmount += value.amount;
                    this.gstTotal += value.gst;
                });
                this.qrValue = response.bookingCode;
            },
                (err) => {
                    console.log(err);
                }); */
    }

    setUserForBill(userModel: UserModel) {
        this.customerDetail = userModel;
        this.modalService.dismissAll();
    }

    private openModal(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg', backdrop: 'static', keyboard: false });
    }
}