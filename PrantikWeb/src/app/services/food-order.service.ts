import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodOrderModel } from '../models/food-order.model';
import { FoodOrderEndPoint } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class FoodOrderService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllFoodOrders(): Observable<FoodOrderModel[]> {
       return this.httpClient.get<FoodOrderModel[]>(FoodOrderEndPoint);      
    }

    public PostFoodOrder(foodOrder: FoodOrderModel): Observable<FoodOrderModel> {
        return this.httpClient.post<FoodOrderModel>(FoodOrderEndPoint, foodOrder);
    }

    public PutFoodOrder(foodOrder: FoodOrderModel): Observable<void> {
        return this.httpClient.put<void>(FoodOrderEndPoint + '/' + foodOrder.id, foodOrder);
    }

    public DeleteFoodOrder(foodOrder: FoodOrderModel): Observable<FoodOrderModel> {
        return this.httpClient.delete<FoodOrderModel>(FoodOrderEndPoint + '/' + foodOrder.id);
    }
}