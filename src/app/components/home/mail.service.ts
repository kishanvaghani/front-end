import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket,io } from 'socket.io-client';
import { subscribeOn } from 'rxjs/operators';
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

  sendMessage(chatDetail: any){
    return this.http.post(`${this.url}/chat`,chatDetail);
  }
  getMessage(){
    return this.http.get(`${this.url}/chat/getChat`);
  }

  // listen(eventName:string){
  //   return this.socket.on(eventName,(data:any)=>{
  //     console.log(data);
      
  //   })
  // }
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