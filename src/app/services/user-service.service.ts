import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';

  public headers =  {
    headers: new  HttpHeaders(
      { 'Content-Type': 'application/json', 'x-auth-token': this.token }
    )
  };

  baseUrl:string = environment.URL_API;

  constructor(private http: HttpClient) { }

  saveUser(data: any) {
      return this.http.post<any>(`${this.baseUrl}/users`, data,  this.headers).pipe( map( (data: any[]) => {
        return data;
      }));
  }

  loginUser(data:any){
    return this.http.post<any>(`${this.baseUrl}/auth/`, data,  this.headers).pipe( map( (data: any[]) => {
      return data;
    }));

  }
}
