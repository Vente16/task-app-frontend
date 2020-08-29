import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtuhServiceService {

  public token =
  (localStorage.getItem('token')) ?
        localStorage.getItem('token'): null;

  public isLogged = false;

  public headers =  {
    headers: new  HttpHeaders(
      { 'Content-Type': 'application/json', 'x-auth-token': this.token }
    )
  };

  baseUrl:string = environment.URL_API;

  constructor(private http: HttpClient) {

   }

   getUserData(){

   return this.http.get<any>(`${this.baseUrl}/auth/`, this.headers);

   }

  userValidate():boolean {

    if(this.token !== null){
      return true;
    }

    return false;
  }
}
