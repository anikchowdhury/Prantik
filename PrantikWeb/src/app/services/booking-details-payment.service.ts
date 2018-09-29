import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingDetailsPaymentsEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';
import { BookingDetailsPayment } from '../models/booking-details-payment.model';

@Injectable()
export class BookingDetailsPaymentService {
    constructor(private httpClient: HttpClient) {

    }

    public PostBookingDetailsPayment(bookingDetailsPaymentModel: BookingDetailsPayment): Observable<BookingDetailsPayment> {
        return this.httpClient.post<BookingDetailsPayment>(BookingDetailsPaymentsEndpointContsant, bookingDetailsPaymentModel);
    }
}