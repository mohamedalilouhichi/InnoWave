import {Component, OnInit} from '@angular/core';
import {MessageService} from "./message.service";
import {Message, Message2} from "./message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  messages: Message[] = [];
  newMessage: string = ''  ;
  sender: number= 1;
  receiver: number= 2;
  id: number= 1;
  constructor(private messageService: MessageService) { }
  ngOnInit() {
    this.fetchMessages();
  }
  fetchMessages() {
    this.messageService.getmessage().subscribe((data: any[]) => {
      console.log(data);
      this.messages = data;
    });

  }

  addMessage(newMessage:string,sender:number,receiver:number) {

this.messageService.addmessage(this.newMessage,this.sender,this.receiver).subscribe(() => {
  console.log('Message added successfully');
  this.newMessage = '';

  this.fetchMessages();
});
}


}
