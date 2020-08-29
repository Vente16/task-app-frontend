import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  public token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';

  public headers =  {
    headers: new  HttpHeaders(
      { 'Content-Type': 'application/json', 'x-auth-token': this.token }
    )
  };

  baseUrl:string = environment.URL_API;

  constructor(private http: HttpClient
    ) { }

  saveTask(data: any) {
    return this.http.post<any>(`${this.baseUrl}/tasks`, data,  this.headers);
  }

  getTasks() {
    return this.http.get<any>(`${this.baseUrl}/tasks`, this.headers);
  }

  updateTask(data: any) {
    return this.http.put<any>(`${this.baseUrl}/tasks/${data._id}`, data,  this.headers);
  }

  deleteTask(data: any) {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${data._id}`, this.headers);
  }

}
