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
       return this.httpClient.get<UserModel[]>(PostUserEndpointContsant);      
    }

    public PostUser(user: UserModel): Observable<UserModel> {
        return this.httpClient.post<UserModel>(PostUserEndpointContsant, user);
    }

    public PutUser(user: UserModel): Observable<void> {
        return this.httpClient.put<void>(PostUserEndpointContsant + '/' + user.id, user);
    }

    public DeleteUser(user: UserModel): Observable<UserModel> {
        return this.httpClient.delete<UserModel>(PostUserEndpointContsant + '/' + user.id);
    }
}