import { Component, Input, OnInit } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';

@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss'],
    providers: []
})

export class AddPaymentComponent implements OnInit {
    @Input() paymentDetails: PaymentModel;

    constructor() {

    }

    ngOnInit() {
        
    }
}