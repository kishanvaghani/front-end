import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket,io } from 'socket.io-client';
import { subscribeOn } from 'rxjs/operators';
import { user } from 'src/app/model/user';
@Injectable({
  providedIn: 'root'
})
export class MailService {

  url = environment.url;
  socket:Socket;
  constructor(private http: HttpClient) {
    this.socket=io('http://localhost:3000');
   }
   
  sendMail(email:any){
    return this.http.post(`${this.url}/sendMail`,email);
  }

  sendMessage(chatDetail: any):Observable<number>{
    return this.http.post<number>(`${this.url}/chat`,chatDetail);
  }
  getMessage(){
    return this.http.get(`${this.url}/chat/getChat`);
  }
  deleteChat(id:number){
    return this.http.delete(`${this.url}/chat/delete/${id}`);
  }

  listen(eventName:string):Observable<object | string>{
    return new Observable((subscribe)=>{
      this.socket.on(eventName, (data: object | string)=>{        
        subscribe.next(data);
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }
}