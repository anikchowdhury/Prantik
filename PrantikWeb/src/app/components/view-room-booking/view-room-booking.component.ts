import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RoomBookingModel } from '../../models/room-booking.model';

@Component({
    selector: 'app-view-room-booking',
    templateUrl: './view-room-booking.component.html',
    styleUrls: ['./view-room-booking.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewRoomBookingComponent implements OnInit, DoCheck {

    @Input() roomBookings: RoomBookingModel[];
    totalAmount: number;
    differ: IterableDiffer<RoomBookingModel>;

    constructor(private iterableDiffer: IterableDiffers, private cd:ChangeDetectorRef) {
        this.roomBookings = [];
        this.totalAmount = 0;
        this.differ =  this.iterableDiffer.find(this.roomBookings).create(null);
    }
    
    ngOnInit() {       
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.roomBookings);
        if (changes) {
            this.cd.markForCheck();
            this.totalAmount = 0;
            this.roomBookings.forEach(element => {
                this.totalAmount += element.amount;
            });
        }
    }
}