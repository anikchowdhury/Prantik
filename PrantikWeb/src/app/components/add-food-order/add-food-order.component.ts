import { Component, OnInit } from '@angular/core';
import { MenuItemsConstant } from '../../constants/master-data.constant';

@Component({
    selector: 'app-add-food-order',
    templateUrl: './add-food-order.component.html',
    styleUrls: ['./add-food-order.component.scss']
})
export class AddFoodComponent implements OnInit {
    foodMenu: any[];
    constructor() {
        this.foodMenu = MenuItemsConstant;
    }

    ngOnInit() {
 
    }
}