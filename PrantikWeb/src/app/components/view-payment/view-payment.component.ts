import { Component, Input, OnInit } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
    @Input() paymentDetails: PaymentModel[];

    constructor() {

    }

    ngOnInit() {
        
    }
}
