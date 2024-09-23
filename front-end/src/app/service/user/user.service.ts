import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const api = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(api + `user/authenticate`, userData);
  }
}
