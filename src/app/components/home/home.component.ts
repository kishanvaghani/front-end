import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MailService } from './mail.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribeForm!: FormGroup;
  feedback:string='';
  output:any[]=[];
  showMessages:number=0;
  constructor(private fb:FormBuilder, private auth:AuthService, private socket:MailService, private spinner: NgxSpinnerService, private toastr:ToastrService) { }
  ngOnInit(): void {
    
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.socket.listen('typing').subscribe((data)=>{
      this.updateFeedback(data);
    })
  }
updateFeedback(data:any){
 this.feedback='';
 if(!!!data)return;
 this.output.push(data);
}
  subscribeEmail(){
    if(this.subscribeForm.valid){
      this.spinner.show();
      this.socket.sendMail(this.subscribeForm.value).subscribe((res)=>{
        console.log("mail",res);
        this.spinner.hide();
        this.showSuccess();
      },
      (error)=>{
        this.spinner.hide();
        alert("Email is not valid");
        console.log(error);
      })  
    }
  }
  logout(){
    this.auth.deleteToken();
    // location.reload();
  }
  showSuccess() {
    this.toastr.success('Email Sent Successfully','',{
      timeOut: 2000,
    });
  }
  displayMessages(latestMessage:number){
    this.showMessages=latestMessage;
    console.log("New SMS", this.showMessages);
    
  }
}
