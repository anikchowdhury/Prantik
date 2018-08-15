import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: {
    name: string,
    address: string
  };
  constructor() { 
    this.user = {
      name: 'Hello',
      address: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Submitted');
  }
}
