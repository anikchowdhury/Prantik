import { Component, OnInit, Input, DoCheck, IterableDiffers, IterableDiffer, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RoomBookingModel } from '../../models/room-booking.model';

@Component({
    selector: 'app-view-room-booking',
    templateUrl: './view-room-booking.component.html',
    styleUrls: ['./view-room-booking.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewRoomBookingComponent implements OnInit, DoCheck {

    @Input() roomBookings: RoomBookingModel[];
    @Output() editButtonClicked: EventEmitter<RoomBookingModel> = new EventEmitter();
    @Output() deleteButtonClicked: EventEmitter<RoomBookingModel> = new EventEmitter();
    totalAmount: number;
    differ: IterableDiffer<RoomBookingModel>;
    faEdit: IconDefinition;
    faTrashAlt: IconDefinition;

    constructor(private iterableDiffer: IterableDiffers, private cd:ChangeDetectorRef) {
        this.roomBookings = [];
        this.totalAmount = 0;
        this.differ =  this.iterableDiffer.find(this.roomBookings).create(null);
        this.faEdit = faEdit;
        this.faTrashAlt = faTrashAlt;
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
    
    notifyEdit(roomBookingToEmit: RoomBookingModel){
        console.log(roomBookingToEmit);
        this.editButtonClicked.emit(roomBookingToEmit);
    }
    notifyDelete(roomBookingToEmit: RoomBookingModel){
        console.log(roomBookingToEmit);
        this.deleteButtonClicked.emit(roomBookingToEmit);
    }
}