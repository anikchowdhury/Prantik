import { Component, OnInit, Input } from '@angular/core';
import { RoomBookingModel } from '../models/room-booking.model';

@Component({
    selector: 'app-view-room-booking',
    templateUrl: './view-room-booking.component.html',
    styleUrls: ['./view-room-booking.component.css']
})

export class ViewRoomBookingComponent implements OnInit {

    @Input() roomBookings: RoomBookingModel[];

    constructor() {
        this.roomBookings = [];
    }
    ngOnInit() {

    }
}