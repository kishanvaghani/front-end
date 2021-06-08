import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MailService } from './mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribeForm!: FormGroup;
  constructor(private fb:FormBuilder, private socket:MailService, private spinner: NgxSpinnerService, private toastr:ToastrService) { }
  feedback:string='';
  output:any[]=[];
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
  showSuccess() {
    this.toastr.success('Email Sent Successfully','',{
      timeOut: 2000,
    });
  }
}
