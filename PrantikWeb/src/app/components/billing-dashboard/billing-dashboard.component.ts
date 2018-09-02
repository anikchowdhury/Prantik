import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RoomBookingModel } from '../../models/room-booking.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css'],
  providers: [UserService]
})
export class BillingDashboardComponent implements OnInit {
  user: UserModel;
  users: UserModel[];
  roomBookings: RoomBookingModel[];

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private userService: UserService) {
    this.user = {
      name: '',
      address: ''
    };
    this.users = [];
    this.roomBookings = [];
  }

  ngOnInit() {
    this.user.name = "Anik";
    this.user.address = "Kolkata";
    this.user.age = 27;
    this.users.push(this.user);
    this.route.queryParams.subscribe(params => {
      console.log(params['myVal']);
      console.log(params['myAnotherVal']);
    });
    this.userService.GetAllUsers()
      .subscribe((response: HttpResponse<UserModel[]>) => {
        console.log(response);
      },
        (err) => {
          console.log(err);
          console.log('Inside Subscribe');
      });
  }

  onSubmit() {
    console.log('Submitted');
  }

  closeResult: string;

  displayAddedRoom(roomBookingModel: RoomBookingModel) {
    console.log('Received');
    console.log(roomBookingModel);
    this.roomBookings.push(roomBookingModel);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {
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
