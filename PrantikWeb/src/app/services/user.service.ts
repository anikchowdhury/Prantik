import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { PostUserEndpointContsant } from '../constants/endpoints.constants';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) {

    }

    public GetAllUsers(): Observable<UserModel[]> {
       return this.httpClient.get<UserModel[]>('http://localhost:58335/api/Users');      
    }

    public PostUser(user: UserModel): Observable<UserModel> {
        return this.httpClient.post<UserModel>(PostUserEndpointContsant, user);
    }
}