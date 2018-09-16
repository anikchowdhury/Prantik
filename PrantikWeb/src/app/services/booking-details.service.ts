import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomBookingModel } from '../models/room-booking.model';
import { PostBookingDetailsEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';
import { BookingDetailsModel } from '../models/booking-details.model';

@Injectable()
export class BookingDetailsService {
    constructor(private httpClient: HttpClient) {

    }

    public PostRoomBookings(): Observable<BookingDetailsModel> {
        return this.httpClient.post<BookingDetailsModel>(PostBookingDetailsEndpointContsant, null);
    }
}