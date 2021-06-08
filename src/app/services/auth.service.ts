import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../model/user';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Socket,io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  // url = 'http://localhost:3000/api'
  url = environment.url;
  redirectUrl: any;
  // socket:Socket;
  constructor(private http: HttpClient) { 
    // this.socket=io('http://localhost:3000');
  }

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  loginUser(user: any): Observable<user[] | boolean> {
    return this.http.post<user[]>(`${this.url}/user/userLogin`, user).pipe(map(Users => {
      if(Users.length<1){ return false}
        this.setToken(Users);
        this.getLoggedInName.emit(true);
        return Users; 
    }));
  }

  

  setToken(token: user[]) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
