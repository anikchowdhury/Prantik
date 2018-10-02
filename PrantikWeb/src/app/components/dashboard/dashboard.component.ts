import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { BookingDetailsService } from '../../services/booking-details.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { BookingDetailsModel } from '../../models/booking-details.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService, BookingDetailsService]
})
export class DashboardComponent implements OnInit {

  myValParam: string;
  searchBookingFn: any;
  searchFailed: boolean;
  searching: boolean;
  bookingSearchFormatter: any;
  searchBookingModel: string;
  allUsers: UserModel[];
  bookingDetails: BookingDetailsModel[];

  constructor(private userService: UserService, private bookingDetailsService: BookingDetailsService, private router: Router) {
    this.searchFailed = false;
    this.searching = false;
    this.myValParam = 'I am Bound';
    this.bookingSearchFormatter = (result: UserModel) => result.name;
    this.searchBookingModel = '';
    this.bookingDetails = [];
  }

  ngOnInit() {
    this.bookingDetailsService.GetAllBookingDetails()
      .subscribe((response: BookingDetailsModel[]) => {
        this.bookingDetails = response;
      },
        (err) => {
          console.log(err);
        });
    /* this.searchBookingFn = (text$: Observable<UserModel[]>) =>
       text$.pipe(
         debounceTime(300),
         distinctUntilChanged(),
         tap(() => this.searchFailed = true),
         switchMap(term =>
           this.userService.GetAllUsers().pipe(
             tap(() => this.searchFailed = false),
             catchError(() => {
               this.searchFailed = true;
               return of([]);
             }))
         ),
         tap(() => this.searching = false)
       )*/
  }

  selectBooking(booking: NgbTypeaheadSelectItemEvent) {
  }

  searchBooking() {
    this.router.navigate(['/searchResult'], { queryParams: { bookingCode: this.searchBookingModel } });
  }
}
