import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { RoomBookingModel } from '../../models/room-booking.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
    providers: [BookingDetailsService]
})

export class SearchResult implements OnInit {
    isBookingFound: boolean;
    usersForBooking: UserModel[];
    roomBookingsForBooking: RoomBookingModel[];
    bookingCodeId: string;

    constructor(private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService) {
        this.isBookingFound = false;
        this.usersForBooking = [];
        this.roomBookingsForBooking = [];
        this.bookingCodeId = '';
    }

    ngOnInit() {
        let bookingCode: string; 
        this.route.queryParams.subscribe(params => {            
            bookingCode = params['bookingCode'];
          });     
          this.bookingCodeId = bookingCode;
        this.bookingDetailsService.GetBookingDetails(bookingCode)
            .subscribe((response: BookingDetailsModel) => {
                this.usersForBooking = response.users;
                this.roomBookingsForBooking = response.rooms;
                this.isBookingFound = true;
            },
                (err) => {
                    console.log(err);
                });
    }
}