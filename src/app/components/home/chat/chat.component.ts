import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../mail.service';

export interface chat{
  u_id:number,
  name:string,
  message:string,
  time:string
}

export interface user{
  email: string,
  id: number,
  mobile: string,
  name: string,
  pass: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  chatStart: boolean = true;
  chats!: FormGroup;
  userName?:string;
  userData: any;
  feedback: string='';
  conversations:chat[] = [];
  message = 0;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  @Output() latestMessage:EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private chatService: MailService) { }

  ngOnInit(): void {
    this.chats = this.fb.group({
      message: ['', [Validators.required]]
    });
    this.userData = localStorage.getItem("token");
    this.userData = JSON.parse(this.userData);

    this.chatService.getMessage().subscribe((res:any) => {
      this.conversations = res;
      // console.log("value",Object.values(res));
      // console.log("conversion",this.conversations.push(...Object.values(res)));
    });
    this.chatService.listen('chat').subscribe((chatDetail) => this.updateMessage(chatDetail));
    this.chatService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.chatService.listen('typingDone').subscribe((data) => this.updateFeedbackMessage(data));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      // console.log(this.myScrollContainer.nativeElement.scrollTop);
    } catch (err) { }
  }

  updateMessage(chatDetail: any){
    console.log("chatData on Update",chatDetail);
    this.conversations.push(chatDetail);
    this.message +=1;
    this.latestMessage.emit(this.message);
  }
  updateFeedback(data: any) {
    this.userName=`${data}`;
    this.feedback = `${data} is typing`;
  }
  messageTyping(): void {
    this.chatService.emit('typing', this.userData.name);
  }

  updateFeedbackMessage(data: any) {
    this.feedback = ``;
  }

  messageTypingDone(): void {
    this.chatService.emit('typingDone', this.userData.name);
  }
  get getControl() {
    return this.chats.controls;
  }

  chat() {
    this.chatStart = !this.chatStart;
    this.message=0;
    this.latestMessage.emit(this.message);
  }

  sendMessage(): any {
    let value: string = this.chats.value.message.trim();
    console.log("submit", value);
    if (this.chats.value.message.length < 1) return false;
    // this.conversation.push({
    //   u_id: this.userData.id,
    //   name: this.userData.name,
    //   message: value,
    //   time: Date()
    // });
    // console.log((this.conversation[this.conversation.length - 1]));
    this.chatService.sendMessage({ u_id: this.userData.id, name: this.userData.name, message: value, time:  Date() }).subscribe((res) => {
      console.log(res);
    },
      (error) => {
        alert("message not sent");
      })
    this.chatService.emit("chat", { u_id: this.userData.id, name: this.userData.name, message: value, time:  Date() });
    this.chats.reset({});
  }

}
