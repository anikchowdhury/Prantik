import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../models/payment.model';
import { PostPaymentEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllPayments(): Observable<PaymentModel[]> {
       return this.httpClient.get<PaymentModel[]>(PostPaymentEndpointContsant);      
    }

    public PostPayment(payment: PaymentModel): Observable<PaymentModel> {
        return this.httpClient.post<PaymentModel>(PostPaymentEndpointContsant, payment);
    }

    public PutPayment(payment: PaymentModel): Observable<void> {
        return this.httpClient.put<void>(PostPaymentEndpointContsant + '/' + payment.id, payment);
    }

    public DeletePayment(payment: PaymentModel): Observable<PaymentModel> {
        return this.httpClient.delete<PaymentModel>(PostPaymentEndpointContsant + '/' + payment.id);
    }
}