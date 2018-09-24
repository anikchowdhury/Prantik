import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodOrderModel } from '../../models/food-order.model';
import { FoodOrderService} from '../../services/food-order.service';
import { MenuItemsConstant } from '../../constants/master-data.constant';

@Component({
    selector: 'app-add-food-order',
    templateUrl: './add-food-order.component.html',
    styleUrls: ['./add-food-order.component.scss'],
    providers: [FoodOrderService]
})
export class AddFoodComponent implements OnInit {
    @Output() foodOrderAddedSuccesfully: EventEmitter<FoodOrderModel> = new EventEmitter();
    @Input() foodOrders: FoodOrderModel;
    foodMenu: any[];
    constructor(private foodOrderService: FoodOrderService) {
        this.foodOrders = {
            id: 0
        };
        this.foodMenu = MenuItemsConstant;
    }

    ngOnInit() {
 
    }
    
    addFoodOrderSubmit() {
     if(this.foodOrders.id == 0)
        this.foodOrderService.PostFoodOrder(this.foodOrders)
          .subscribe((response: FoodOrderModel) => {
            this.foodOrderAddedSuccesfully.emit({
              id: response.id,
              menuId: response.menuId,
              quantity: response.quantity,
              price: response.price,
              orderExpectedDeliveryDate: response.orderExpectedDeliveryDate,
              orderExpectedDeliveryTime: response.orderExpectedDeliveryTime
            });
          },
            (err) => {
              console.log(err);
            });
      else
          this.foodOrderService.PutFoodOrder(this.foodOrders)
            .subscribe((response: void) => {
              this.foodOrderAddedSuccesfully.emit(this.foodOrders);
            },
              (err) => {
                console.log(err);
              });
    }
}