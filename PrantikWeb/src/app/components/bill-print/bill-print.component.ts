import { Component, OnInit } from '@angular/core';
import { RoomBookingModel } from '../../models/room-booking.model';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: './bill-print.component.html',
    styleUrls: ['./bill-print.component.scss'],
    providers: [BookingDetailsService]
})
export class BillPrintComponent implements OnInit {
    roomBookings: RoomBookingModel[];
    customerDetail: UserModel;
    totalAmount: number;
    qrValue: string;
    gstTotal: number;

    constructor(private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService) {
        this.roomBookings = [];
        this.totalAmount = 0;
        this.qrValue = '';
        this.gstTotal = 0;
        this.customerDetail = {
            name: '',
            address: '',
            phoneNumber: '',
            comingFrom: ''
        };
    }
    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: Params) =>
                this.bookingDetailsService.GetBookingDetails(params.get('bookingCode'))
            )).subscribe((response: BookingDetailsModel) => {
                console.log(response);
                this.customerDetail = response.users[0];
                this.roomBookings = response.rooms;
                this.roomBookings.forEach((value) => {
                    this.totalAmount += value.amount;
                    this.gstTotal += value.gst;
                });
                this.qrValue = response.bookingCode;
            },
                (err) => {
                    console.log(err);
                });
    }
}