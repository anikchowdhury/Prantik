import { Component, OnInit, Input, EventEmitter, IterableDiffer, ChangeDetectionStrategy, DoCheck, Output, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { FoodOrderModel } from '../../models/food-order.model';
import { IconDefinition, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-view-food',
    templateUrl: './view-food-order.component.html',
    styleUrls: ['./view-food-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFoodComponent implements OnInit, DoCheck {
    @Input() orders: FoodOrderModel[];
    @Output() editButtonClicked: EventEmitter<FoodOrderModel> = new EventEmitter();
    @Output() deleteButtonClicked: EventEmitter<FoodOrderModel> = new EventEmitter();
    
    faEdit: IconDefinition;
    faTrashAlt: IconDefinition;
    totalFoodAmount: number;
    differ: IterableDiffer<FoodOrderModel>;

    constructor(private iterableDiffer: IterableDiffers, private cd: ChangeDetectorRef) {
        this.orders = [];
        this.totalFoodAmount = 0;
        this.differ =  this.iterableDiffer.find(this.orders).create(null);
        this.faEdit = faEdit;
        this.faTrashAlt = faTrashAlt;
    }

    ngOnInit() {

    }

    ngDoCheck() {
        let changes = this.differ.diff(this.orders);
        if (changes) {
            this.cd.markForCheck();
            this.totalFoodAmount = 0;
            this.orders.forEach(element => {
                this.totalFoodAmount += (element.price * element.quantity);
            });
        }
    }

    notifyEdit(orderToEmit: FoodOrderModel) {
        this.editButtonClicked.emit(orderToEmit);
    }
    notifyDelete(orderToEmit: FoodOrderModel) {
        this.deleteButtonClicked.emit(orderToEmit);
    }
}