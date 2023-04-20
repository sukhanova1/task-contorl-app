import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private baseUrl: string = 'http://localhost:3000/';
    
  constructor(private http: HttpClient) {}

  login(data: User): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(this.baseUrl + 'login', body);
  }

  register(data: User): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post<any>(this.baseUrl + 'register', body);
  }
}

