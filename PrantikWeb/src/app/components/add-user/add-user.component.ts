import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  @Output() userOperationSuccess: EventEmitter<UserModel> = new EventEmitter();

  @Input() user: UserModel;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.user.id == 0)
      this.userService.PostUser(this.user)
        .subscribe((response: UserModel) => {
          this.userOperationSuccess.emit({
            name: response.name,
            address: response.address,
            age: response.age,
            idCardNumber: response.idCardNumber,
            relativeName: response.relativeName,
            profession: response.profession,
            comingFrom: response.comingFrom,
            goingTo: response.goingTo,
            phoneNumber: response.phoneNumber,
            id: response.id
          });
        },
          (err) => {
            console.log(err);
          });
    else
      this.userService.PutUser(this.user)
        .subscribe((response: void) => {
          this.userOperationSuccess.emit(this.user);
        },
          (err) => {
            console.log(err);
          });
  }
  
}
