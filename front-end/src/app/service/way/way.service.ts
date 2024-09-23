import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const api = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class WayService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.get(api + `cities`);
  }

  createPlan(params: any): Observable<any> {
    return this.http.post(api + `way/create`, params);
  }
  getPlan(email: string): Observable<any> {
    return this.http.get(api + `way/${email}`);
  }
  getTrainsInformation(checkpoints: any): Observable<any> {
    return this.http.post(api + `trains`, { paths: checkpoints });
  }
  updateWay(params: any): Observable<any> {
    return this.http.post(api + `way/update`, params);
  }
}
