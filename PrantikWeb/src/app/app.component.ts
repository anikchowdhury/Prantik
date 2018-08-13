import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
    console.log('hello');
      this.http.get('api/Values').pipe(map(val => {
        console.log(val);
      },
    error => {
      console.log(error);
    }))
    .subscribe(val=>{
      console.log(val);
    });
  }
  title = 'PrantikWeb';

}
