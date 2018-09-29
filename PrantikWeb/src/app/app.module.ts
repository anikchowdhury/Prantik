import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpInterceptorProviders } from './http-interceptors/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BillingDashboardComponent } from './components/billing-dashboard/billing-dashboard.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AddRoomBookingComponent } from './components/add-room-booking/add-room-booking.component';
import { ViewRoomBookingComponent } from './components/view-room-booking/view-room-booking.component';
import { PrintRoomBillComponent } from './components/room-bill-print/room-bill-print.component';
import { AddPaymentComponent } from './components/add-payment/add-payment-component';
import { SearchResult } from './components/search-result/search-result.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { BillPrintComponent } from './components/bill-print/bill-print.component';
import { AddFoodComponent } from './components/add-food-order/add-food-order.component';
import { ViewFoodComponent } from './components/view-food-order/view-food-order.component';
import { BillingContactDetailsTemplate } from './components/static-templates/billing-contact-details.template';
import { FoodBillPrintPayment } from './components/food-bill-print/food-bill-print.component';


const appRoutes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
   { path: 'billing', component: BillingDashboardComponent },
   { path: 'printBill/:bookingCode/:isRoomBillPrint', component: BillPrintComponent },
   { path: 'searchResult', component: SearchResult },
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
    ViewRoomBookingComponent,
    PrintRoomBillComponent,
    AddPaymentComponent,    
    BillPrintComponent,
    SearchResult,
    ViewPaymentComponent,
    AddFoodComponent,
    ViewFoodComponent,
    FoodBillPrintPayment,
    BillingContactDetailsTemplate
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    NgxQRCodeModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    HttpClientModule,
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
