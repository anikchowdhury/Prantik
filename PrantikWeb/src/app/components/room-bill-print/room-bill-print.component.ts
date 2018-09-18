import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { RoomBookingService } from '../../services/room-booking.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { RoomBookingModel } from '../../models/room-booking.model';
import { faPhone, faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-print-room-bill',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './room-bill-print.component.html',
    styleUrls: ['./room-bill-print.component.scss'],
    providers: [UserService, RoomBookingService]
})
export class PrintRoomBillComponent implements OnInit {
    
    @Input() customerDetail: UserModel;
    @Input() roomBookings: RoomBookingModel[];
    @Input() totalAmount: number;
    @Input() qrValue: string;
    
    faPhone: IconDefinition;
    faHome: IconDefinition;
    billingDate: string;
    elementType: string;

    constructor(private userService: UserService, private roomBookingService: RoomBookingService) {       
        this.faPhone = faPhone;
        this.faHome = faHome;
        let today = new Date();
        this.billingDate = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-IN', '+0530');
        this.elementType = 'img';        
    }
    ngOnInit() {
    }

    printBill() {
        window.print();
    }
}