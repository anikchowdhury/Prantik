import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomBookingModel } from '../models/room-booking.model';

@Component({
    selector: 'app-add-room-booking',
    templateUrl: './add-room-booking.component.html',
    styleUrls: ['./add-room-booking.component.css']
})

export class AddRoomBookingComponent implements OnInit {

    @Output() roomAddedSuccesfully: EventEmitter<RoomBookingModel> = new EventEmitter();
    roomBookingModel: RoomBookingModel;


    constructor() {
        this.roomBookingModel = {
            roomNumber: '',
            bookingStartDate: '',
            bookingEndDate: '',
            amount: 0
        };
    }

    ngOnInit() {

    }

    addRoomBookingSubmit() {
        console.log('Emitted');
        console.log(this.roomBookingModel);
        this.roomAddedSuccesfully.emit(this.roomBookingModel);
    }
}