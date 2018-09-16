import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  myValParam: string;
  searchBookingFn: any;
  searchFailed: boolean;
  searching: boolean;
  bookingSearchFormatter: any;
  searchBookingModel: string;

  constructor(private userService: UserService) { 
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
  selectBooking(booking: NgbTypeaheadSelectItemEvent){
    console.log(booking);
    console.log(booking.item.name);   
  }
}
