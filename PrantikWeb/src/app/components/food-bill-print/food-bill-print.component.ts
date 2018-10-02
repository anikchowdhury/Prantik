import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FoodOrderModel } from '../../models/food-order.model';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-food-bill-print',
    templateUrl: 'food-bill-print.component.html',
    styleUrls: ['./food-bill-print.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FoodBillPrintPayment implements OnInit {

    @Input() foodOrders: FoodOrderModel[];
    @Input() customerDetail: UserModel;
    @Input() totalAmount: number;
    @Input() qrValue: string;

    billingDate: string;
    elementType: string;
    faPhone: IconDefinition;
    constructor(private router: Router) {
        this.foodOrders = [];
        this.faPhone = faPhone;
        this.totalAmount = 0;
        this.qrValue = '';
        let today = new Date();
        this.billingDate = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-IN', '+0530');
        this.elementType = 'img';
    }

    ngOnInit() {

    }

    printBill() {
        window.print();
        this.router.navigate(['']);
    }
}