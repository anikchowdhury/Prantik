import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomBookingModel } from '../models/room-booking.model';
import { PostRoomBookingEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class RoomBookingService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllBookedRooms(): Observable<object> {
       return this.httpClient.get('http://localhost:58335/api/RoomBookings');      
    }

    public PostRoomBookings(roomBooking: RoomBookingModel): Observable<RoomBookingModel> {
        return this.httpClient.post<RoomBookingModel>(PostRoomBookingEndpointContsant, roomBooking);
    }
}