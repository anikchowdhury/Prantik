import { Component, OnInit } from '@angular/core';
import { RoomBookingService } from '../../services/room-booking.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { RoomBookingModel } from '../../models/room-booking.model';

@Component({
    selector: 'print-room-bill',
    templateUrl: './room-bill-print.component.html',
    styleUrls: ['./room-bill-print.component.css'],
    providers: [UserService, RoomBookingService]
})
export class PrintRoomBillComponent implements OnInit {
    users: UserModel[];
    roomBookings: RoomBookingModel[];
    totalAmount: number;
    constructor(private userService: UserService, private roomBookingService: RoomBookingService) {
        this.users = [];
        this.roomBookings = [];
        this.totalAmount = 0;
    }
    ngOnInit() {
        this.userService.GetAllUsers()
        .subscribe((response: UserModel[]) => {
            console.log(response);
            this.users = response;
        },
        (err) => {
            console.log(err);
        });
        this.roomBookingService.GetAllRoomBookings()
        .subscribe((response: RoomBookingModel[]) => {
            console.log(response);
            this.roomBookings = response;
            this.roomBookings.forEach((value) => {
                this.totalAmount += value.amount;
            });
        },
        (err) => {
            console.log(err);
        });
    }
}