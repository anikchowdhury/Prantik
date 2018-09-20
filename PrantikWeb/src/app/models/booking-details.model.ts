import { UserModel } from "./user.model";
import { RoomBookingModel } from "./room-booking.model";
import { PaymentModel } from "./payment.model";

export class BookingDetailsModel {
    id?: number;
    bookingCode?: string;
    users: UserModel[];
    rooms: RoomBookingModel[];
    payments: PaymentModel[];
}