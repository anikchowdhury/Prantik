import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostBookingDetailsUsersEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';
import { BookingDetailsUserModel } from '../models/booking-details-user.model';

@Injectable()
export class BookingDetailsUserService {
    constructor(private httpClient: HttpClient) {

    }

    public PostBookingDetailsUser(bookingDetailsUserModel: BookingDetailsUserModel): Observable<BookingDetailsUserModel> {
        return this.httpClient.post<BookingDetailsUserModel>(PostBookingDetailsUsersEndpointContsant, bookingDetailsUserModel);
    }
}