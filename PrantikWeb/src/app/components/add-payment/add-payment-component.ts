import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentModel } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { PaymentModesConstant } from '../../constants/master-data.constant';

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

  constructor(private paymentService: PaymentService) {
    this.payments = {
      id: 0
    };
      this.paymentModes = PaymentModesConstant;
  }
  ngOnInit() {

  }

  addPaymentSubmit() {
     if(this.payments.id == 0)
        this.paymentService.PostPayment(this.payments)
          .subscribe((response: PaymentModel) => {
            this.paymentAddedSuccesfully.emit({
              id: response.id,
              amount: response.amount,
              paymentModeId: response.paymentModeId,
              additionalDetails: response.additionalDetails,
              bookingDetailsId: response.bookingDetailsId,
              createDate: response.createDate
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