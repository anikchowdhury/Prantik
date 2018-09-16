import { Component, Input } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';

@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss'],
    providers: []
})

export class AddPaymentComponent{
    @Input() paymentDetails: PaymentModel;
    
    constructor() {

    }
}