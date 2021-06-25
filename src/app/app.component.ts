import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  divactive=false;
  count=1;
  loginShow=false;
  currentRoute?: string;
  ipAddress: any=[];

  constructor(private auth:AuthService , private route:Router , private activatedRoute: ActivatedRoute, private http:HttpClient){}

  ngOnInit(){
    // this.route.events.subscribe(Event => {
    //   this.currentRoute = this.route.url;
    //   console.log(this.currentRoute);
    // });
    // if(this.auth.isLoggedIn()){
    //   // if()
    //   this.route.navigate([this.currentRoute])
    // }
    console.log(this.getIPAddress());
    
  }
  getIPAddress()  
  {  
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress.push(res.ip);
      console.log(this.ipAddress);
      
    });;  
  } 
  
}
