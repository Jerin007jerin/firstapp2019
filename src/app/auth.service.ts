import { Injectable } from '@angular/core';
import { Loginuser } from './loginuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient) { }

  public login(userInfo: Loginuser): Observable<any> {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    return this.http.get(environment.baseUrl + '/logintbls?user=' + userInfo.email + '&pass=' + userInfo.password)
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
