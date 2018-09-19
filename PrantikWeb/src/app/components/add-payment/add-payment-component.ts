import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';

@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.scss'],
    providers: [PaymentService]
})

export class AddPaymentComponent implements OnInit {
    @Output() paymentAddedSuccesfully: EventEmitter<PaymentModel> = new EventEmitter();
  paymentModel: PaymentModel;
    paymentModes: any[];

  constructor(private paymentService: PaymentService) {
    this.paymentModel = {
      id: 0,
      bookingDetailsId: 15,
    };
      this.paymentModes=[
          {title: "Cash", value: 1},
          {title: "Cheque", value: 2},
          {title: "Card", value: 3}
      ]
  }
  ngOnInit() {

  }

  addPaymentSubmit() {
    this.paymentService.PostPayment(this.paymentModel)
      .subscribe((response: PaymentModel) => {
        this.paymentAddedSuccesfully.emit({
          id: response.id,
          amount: response.amount,
          paymentModeId: response.paymentModeId,
          additionalDetails: response.additionalDetails,
          bookingDetailsId: response.bookingDetailsId
        });
      },
        (err) => {
          console.log(err);
        });
  }
}