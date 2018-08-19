import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddRoomBookingComponent } from './add-room-booking/add-room-booking.component';
import { ViewRoomBookingComponent } from './view-room-booking/view-room-booking.component';

const appRoutes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'billing', component: BillingDashboardComponent },  
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
   { path: '',
     redirectTo: '/dashboard',
     pathMatch: 'full'
   },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BillingDashboardComponent,
    AddUserComponent,    
    ViewUserComponent,
    AddRoomBookingComponent,
    ViewRoomBookingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes//,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
