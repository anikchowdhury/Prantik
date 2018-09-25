import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodOrderModel } from '../../models/food-order.model';
import { FoodOrderService } from '../../services/food-order.service';
import { MenuItemsConstant } from '../../constants/master-data.constant';

@Component({
  selector: 'app-add-food-order',
  templateUrl: './add-food-order.component.html',
  styleUrls: ['./add-food-order.component.scss'],
  providers: [FoodOrderService]
})
export class AddFoodComponent implements OnInit {
  @Output() foodOrderAddedSuccesfully: EventEmitter<FoodOrderModel> = new EventEmitter();
  @Input() foodOrder: FoodOrderModel;
  foodMenu: any[];
  constructor(private foodOrderService: FoodOrderService) {
    this.foodOrder = {
      id: 0
    };
    this.foodMenu = MenuItemsConstant;
  }

  ngOnInit() {
    
  }

  addfoodOrderubmit() {
    if (this.foodOrder.id == 0)
      this.foodOrderService.PostFoodOrder(this.foodOrder)
        .subscribe((response: FoodOrderModel) => {
          this.foodOrderAddedSuccesfully.emit({
            id: response.id,
            menuId: response.menuId,
            quantity: response.quantity,
            price: response.price,
            orderExpectedDeliveryDate: response.orderExpectedDeliveryDate,
            orderExpectedDeliveryTime: response.orderExpectedDeliveryTime,
            additionalDetails: response.additionalDetails,
            bookingDetailsId: response.bookingDetailsId,
            menuName: MenuItemsConstant.find(x => x.menuId == this.foodOrder.menuId).menuName ,
            orderExpectedDeliveryDateFormated: response.orderExpectedDeliveryDateFormated
          });
        },
          (err) => {
            console.log(err);
          });
    else
      this.foodOrderService.PutFoodOrder(this.foodOrder)
        .subscribe((response: void) => {
          this.foodOrderAddedSuccesfully.emit(this.foodOrder);
        },
          (err) => {
            console.log(err);
          });
  }
}
