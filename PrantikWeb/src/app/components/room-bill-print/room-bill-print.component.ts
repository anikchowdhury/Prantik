import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { RoomBookingService } from '../../services/room-booking.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { RoomBookingModel } from '../../models/room-booking.model';
import { faPhone, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'print-room-bill',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './room-bill-print.component.html',
    styleUrls: ['./room-bill-print.component.scss'],
    providers: [UserService, RoomBookingService]
})
export class PrintRoomBillComponent implements OnInit {
    users: UserModel[];
    roomBookings: RoomBookingModel[];
    totalAmount: number;
    faPhone: IconDefinition;
    faHome: IconDefinition;
    billingDate: string;
    elementType : string;
    value : string;

    constructor(private userService: UserService, private roomBookingService: RoomBookingService) {
        this.users = [];
        this.roomBookings = [];
        this.totalAmount = 0;
        this.faPhone = faPhone;
        this.faHome = faHome;
        let today= new Date(); 
        this.billingDate = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-IN', '+0530');
        this.elementType = 'img';        
    }
    ngOnInit() {
        this.userService.GetAllUsers()
        .subscribe((response: UserModel[]) => {
            this.users = response;
        },
        (err) => {
            console.log(err);
        });
        this.roomBookingService.GetAllRoomBookings()
        .subscribe((response: RoomBookingModel[]) => {
            this.roomBookings = response;
            this.roomBookings.forEach((value) => {
                this.totalAmount += value.amount;
            });
            this.value = this.roomBookings[0].bookingEndDate;
        },
        (err) => {
            console.log(err);
        });
    }
}