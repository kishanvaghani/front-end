import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators'
import { MailService } from '../mail.service';

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
  feedback!: string;
  conversations = [
    { u_id: 1, name: 'kishan', message: 'Hello world', time: '8:21' },
    // { u_id: 14, name: 'kishan', message: 'How are you?', time: '8:21' },
    // { u_id: 1, name: 'kishan', message: 'I am fine thanks', time: '8:21' },
    // { u_id: 14, name: 'kishan', message: 'Glad to hear that', time: '8:21' },
  ];
  conversation = [
    { u_id: 1, name: 'kishan', message: 'Hello world', time: '8:21' }
  ];
  constructor(private fb: FormBuilder, private chatService: MailService) { }
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  ngOnInit(): void {
    this.chats = this.fb.group({
      message: ['', [Validators.required]]
    });
    this.userData = localStorage.getItem("token");
    this.userData = JSON.parse(this.userData);

    this.chatService.getMessage().subscribe((res) => {
      this.conversations.push(...Object.values(res));
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
      console.log(this.myScrollContainer.nativeElement.scrollTop);

    } catch (err) { }
  }
  updateMessage(chatDetail: any){
    console.log("chatData on Update",chatDetail);
    this.conversations.push(chatDetail);
    
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
    this.chatStart = false;
  }

  sendMessage(): any {
    let value: string = this.chats.value.message.trim();
    console.log("submit", value);
    if (this.chats.value.message.length < 1) return false;
    this.conversation.push({
      u_id: this.userData.id,
      name: this.userData.name,
      message: value,
      time: Date()
    });
    // console.log((this.conversation[this.conversation.length - 1]));
    this.chatService.sendMessage(this.conversation[this.conversation.length - 1]).subscribe((res) => {
      console.log(res);
    },
      (error) => {
        alert("message not sent");
      })
    this.chatService.emit("chat", this.conversation[this.conversation.length - 1]);
    this.chats.reset({});
  }

}
