import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  user: UserModel; 
  constructor(private modalService: NgbModal, private userService: UserService) { 
    this.user = {
      name: '',
      address: '',
      comingFrom: '',
      goingTo: '',
      phoneNumber: '',
      age: 0
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.PostUser(this.user)
    .subscribe((response: HttpResponse<number>) => {
      console.log(response);
  },
  (err) => {
      console.log(err);
  });;
    console.log('Submitted');
  }

  closeResult: string;  

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
}
