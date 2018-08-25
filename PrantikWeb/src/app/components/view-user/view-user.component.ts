import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
    @Input() users: UserModel[];

    constructor() {

    }
    ngOnInit() {
        console.log(this.users);
    }
}
