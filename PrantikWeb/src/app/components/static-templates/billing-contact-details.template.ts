import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-billing-contact-details-template',
    template: `<div class="row">
    <div class="col-3 text-left">
      <div class="row">
        <div class="col-12"><strong>Kolkata Booking:</strong></div>
      </div>
      <div class="row">
        <div class="col-12">36/6 Nimchand Maitra Street</div>
      </div>
      <div class="row">
        <div class="col-12">Kolkata - 700035</div>
      </div>
      <div class="row">
        <div class="col-12">
          <fa-icon [icon]="faPhone"></fa-icon> 9830386745
        </div>
      </div>
    </div>
    <div class="col-7 text-center">
      <div class="row">
        <h1 class="col-12">Prantik Hotel And Resorts</h1>
      </div>
      <div class="row">
        <div class="col-12">31, Mini Holiday Home Sector, New Digha, Purba Midnapur</div>
      </div>
    </div>
    <div class="col-2">
      <div class="row">
        <div class="col-3">
          <fa-icon [icon]="faPhone"></fa-icon>
        </div>
        <div class="col-9 pl-0 text-right"> 9062572195</div>
        <div class="col-3">
          <fa-icon [icon]="faHome"></fa-icon>
        </div>
        <div class="col-9 pl-0 text-right"> 03220-266541</div>
      </div>
    </div>
  </div>`
})

export class BillingContactDetailsTemplate {
    faPhone: IconDefinition;
    faHome: IconDefinition;

    constructor() {
        this.faPhone = faPhone;
        this.faHome = faHome;
    }
}