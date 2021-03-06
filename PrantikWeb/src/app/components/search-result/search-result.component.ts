import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { RoomBookingModel } from '../../models/room-booking.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingDetailsService } from '../../services/booking-details.service';
import { BookingDetailsModel } from '../../models/booking-details.model';
import { PaymentModel } from '../../models/payment.model';
import { FoodOrderModel } from '../../models/food-order.model';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss'],
    providers: [BookingDetailsService]
})

export class SearchResult implements OnInit {
    usersForBooking: UserModel[];
    roomBookingsForBooking: RoomBookingModel[];
    foodOrdersForBooking: FoodOrderModel[];
    payments: PaymentModel[];    
    bookingCodeId: number;
    bookingCode: string;

    constructor(private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService) {
        this.usersForBooking = [];
        this.roomBookingsForBooking = [];
        this.foodOrdersForBooking = [];
        this.bookingCodeId = 0;
        this.bookingCode = ''        
    }

    ngOnInit() {        
        this.route.queryParams.subscribe(params => {            
            this.bookingCode = params['bookingCode'];
          });     
          
        this.bookingDetailsService.GetBookingDetails(this.bookingCode)
            .subscribe((response: BookingDetailsModel) => {
                this.usersForBooking = response.users;
                this.roomBookingsForBooking = response.rooms;
                this.bookingCodeId = response.id;
                this.payments = response.payments;
                this.foodOrdersForBooking = response.foodOrders;
            },
                (err) => {
                    console.log(err);
                });
    }
}
