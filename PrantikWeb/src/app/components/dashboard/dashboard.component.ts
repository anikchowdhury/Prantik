import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { BookingDetailsService } from '../../services/booking-details.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

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

  constructor(private userService: UserService, private bookingDetailsService: BookingDetailsService, private router: Router) {
    this.searchFailed = false;
    this.searching = false;
    this.myValParam = 'I am Bound';
    this.bookingSearchFormatter = (result: UserModel) => result.name;
    this.searchBookingModel = '';
  }

  ngOnInit() {
    this.searchBookingFn = (text$: Observable<UserModel[]>) =>
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
      )
  }

  selectBooking(booking: NgbTypeaheadSelectItemEvent) {
    console.log(booking);
    console.log(booking.item.name);
  }

  searchBooking() {
    this.router.navigate(['/searchResult'], { queryParams: { bookingCode: this.searchBookingModel } });
  }
}
