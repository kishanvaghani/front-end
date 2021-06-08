import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'frontend';
  divactive=false;
  count=1;
  loginShow=false;
  currentRoute?: string;

  constructor(private auth:AuthService , private route:Router , private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    // this.route.events.subscribe(Event => {
    //   this.currentRoute = this.route.url;
    //   console.log(this.currentRoute);
    // });
    // if(this.auth.isLoggedIn()){
    //   // if()
    //   this.route.navigate([this.currentRoute])
    // }
  }
  ngAfterViewChecked(){}
}
