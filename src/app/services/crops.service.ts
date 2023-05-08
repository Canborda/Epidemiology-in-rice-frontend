import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { ApiSuccessI } from '../models/api.model';
import { CropI } from '../models/crop.model';
import { GeeDataResponseI, GeeRequestI } from '../models/gee.model';

@Injectable({ providedIn: 'root' })
export class CropsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCrops(): Observable<ApiSuccessI<CropI[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<ApiSuccessI<CropI[]>>(
      this.baseUrl + ROUTES.crops.BASE,
      {
        headers,
      }
    );
  }

  getPhenology(data: GeeRequestI): Observable<ApiSuccessI<GeeDataResponseI>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = { map_id: data.map_id, index: data.index };
    return this.http.get<ApiSuccessI<GeeDataResponseI>>(
      this.baseUrl + ROUTES.crops.phenology,
      { headers, params }
    );
  }
}
