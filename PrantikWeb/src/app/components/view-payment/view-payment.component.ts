import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PaymentModel } from '../../models/payment.model';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
    @Input() payments: PaymentModel[];
    @Output() editButtonClicked: EventEmitter<PaymentModel> = new EventEmitter();
    @Output() deleteButtonClicked: EventEmitter<PaymentModel> = new EventEmitter();
    faEdit: IconDefinition;
    faTrashAlt: IconDefinition;

    constructor() {
        this.payments = [];
        this.faEdit = faEdit;
        this.faTrashAlt = faTrashAlt;

    }

    ngOnInit() {
        
    }
    
    notifyEdit(paymentToEmit: PaymentModel){
        this.editButtonClicked.emit(paymentToEmit);
    }
    notifyDelete(paymentToEmit: PaymentModel){
        this.deleteButtonClicked.emit(paymentToEmit);
    }
}
