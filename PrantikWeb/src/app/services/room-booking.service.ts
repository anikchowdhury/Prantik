import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomBookingModel } from '../models/room-booking.model';
import { PostRoomBookingEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class RoomBookingService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllRoomBookings(): Observable<RoomBookingModel[]> {
        return this.httpClient.get<RoomBookingModel[]>(PostRoomBookingEndpointContsant);
    }

    public PostRoomBookings(roomBooking: RoomBookingModel): Observable<RoomBookingModel> {
        return this.httpClient.post<RoomBookingModel>(PostRoomBookingEndpointContsant, roomBooking);
    }

    public PutRoomBookings(roomBooking: RoomBookingModel): Observable<void> {
        return this.httpClient.put<void>(PostRoomBookingEndpointContsant + '/' + roomBooking.id, roomBooking);
    }
}