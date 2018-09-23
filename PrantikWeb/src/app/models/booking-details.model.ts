import { UserModel } from "./user.model";
import { RoomBookingModel } from "./room-booking.model";
import { PaymentModel } from "./payment.model";
import { FoodOrderModel } from "./food-order.model";

export class BookingDetailsModel {
    id?: number;
    bookingCode?: string;
    users: UserModel[];
    rooms: RoomBookingModel[];
    payments: PaymentModel[];
    foodOrders: FoodOrderModel[];
    createDate?: string;
}