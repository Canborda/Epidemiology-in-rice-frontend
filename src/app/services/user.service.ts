import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { AuthI, LoginI, SignupI } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string = environment.API_URL;
  private authToken: any;

  constructor(private http: HttpClient) {}

  login(data: LoginI): Observable<AuthI> {
    return this.http.post<AuthI>(this.baseUrl + ROUTES.users.login, data);
  }

  signup(data: SignupI): Observable<unknown> {
    return this.http.post<SignupI>(this.baseUrl + ROUTES.users.signup, data);
  }
}