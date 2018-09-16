import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private modalService: NgbModal, private userService: UserService) {
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
            idCardNo: response.idCardNo,
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

  closeResult: string;

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
