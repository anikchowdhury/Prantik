import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
    @Input() users: UserModel[];
    @Output() editButtonClicked: EventEmitter<UserModel> = new EventEmitter();
    @Output() deleteButtonClicked: EventEmitter<UserModel> = new EventEmitter();

    faEdit: IconDefinition;
    faTrashAlt: IconDefinition;

    constructor() {
        this.faEdit = faEdit;
        this.faTrashAlt = faTrashAlt;
    }
    ngOnInit() {        
    }

    notifyEdit(userToEmit: UserModel){
        this.editButtonClicked.emit(userToEmit);
    }
    notifyDelete(userToEmit: UserModel){
        this.deleteButtonClicked.emit(userToEmit);
    }
}
