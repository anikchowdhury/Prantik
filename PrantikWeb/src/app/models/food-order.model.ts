export class FoodOrderModel {
    id?: number;
    bookingDetailsId?: number;
    menuId?: number;
    quantity?: number;
    price?: number;
    orderExpectedDeliveryDate?: string;
    createDate?: string;
    orderExpectedDeliveryTime?: string;
    additionalDetails?: string;
    menuName?: string;
    orderExpectedDeliveryDateFormated?: string;
}