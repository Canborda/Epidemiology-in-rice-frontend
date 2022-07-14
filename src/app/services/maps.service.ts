import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { ApiMapSuccessI } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class MapsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getMaps(): Observable<ApiMapSuccessI> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<ApiMapSuccessI>(this.baseUrl + ROUTES.maps.BASE, {
      headers,
    });
  }

  // TODO createMap service
}
