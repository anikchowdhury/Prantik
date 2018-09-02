import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { PostUserEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllUsers(): Observable<object> {
       return this.httpClient.get('http://localhost:58335/api/Users');      
    }

    public PostUser(user: UserModel): Observable<object> {
        console.log(user);
        return this.httpClient.post(PostUserEndpointContsant, user);
    }
}