import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { PaymentModesConstant, PaymentForContsant } from '../../constants/master-data.constant';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  providers: [PaymentService]
})

export class AddPaymentComponent implements OnInit {
  @Output() paymentAddedSuccesfully: EventEmitter<PaymentModel> = new EventEmitter();
  @Input() payments: PaymentModel;
  paymentModes: any[];
  paymentForList: any[];

  constructor(private paymentService: PaymentService) {
    this.payments = {
      id: 0
    };
    this.paymentModes = PaymentModesConstant;
    this.paymentForList = PaymentForContsant;
  }
  ngOnInit() {

  }

  addPaymentSubmit() {
    if (this.payments.id == 0)
      this.paymentService.PostPayment(this.payments)
        .subscribe((response: PaymentModel) => {
          this.paymentAddedSuccesfully.emit({
            id: response.id,
            amount: response.amount,
            paymentModeId: response.paymentModeId,
            additionalDetails: response.additionalDetails,
            createDate: response.createDate,
            paymentFor: this.payments.paymentFor
          });
        },
          (err) => {
            console.log(err);
          });
    else
      this.paymentService.PutPayment(this.payments)
        .subscribe((response: void) => {
          this.paymentAddedSuccesfully.emit(this.payments);
        },
          (err) => {
            console.log(err);
          });
  }
}