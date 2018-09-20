import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, IterableDiffers, IterableDiffer } from '@angular/core';
import { faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PaymentModel } from '../../models/payment.model';

@Component({
    selector: 'app-view-payment',
    templateUrl: './view-payment.component.html',
    styleUrls: ['./view-payment.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPaymentComponent implements OnInit {
    @Input() payments: PaymentModel[];
    @Output() editButtonClicked: EventEmitter<PaymentModel> = new EventEmitter();
    @Output() deleteButtonClicked: EventEmitter<PaymentModel> = new EventEmitter();
    faEdit: IconDefinition;
    faTrashAlt: IconDefinition;
    totalAmount: number;
    differ: IterableDiffer<PaymentModel>;

    constructor(private iterableDiffer: IterableDiffers, private cd: ChangeDetectorRef) {
        this.payments = [];
        this.faEdit = faEdit;
        this.faTrashAlt = faTrashAlt;
        this.totalAmount = 0;
        this.differ =  this.iterableDiffer.find(this.payments).create(null);
    }

    ngOnInit() {

    }

    ngDoCheck() {
        let changes = this.differ.diff(this.payments);
        if (changes) {
            this.cd.markForCheck();
            this.totalAmount = 0;
            this.payments.forEach(element => {
                this.totalAmount += element.amount;
            });
        }
    }

    notifyEdit(paymentToEmit: PaymentModel) {
        this.editButtonClicked.emit(paymentToEmit);
    }
    notifyDelete(paymentToEmit: PaymentModel) {
        this.deleteButtonClicked.emit(paymentToEmit);
    }
}
