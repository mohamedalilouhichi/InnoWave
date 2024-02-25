import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MessageService } from "./message.service";
import { Message } from "./message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  sender!: number ;
  receiver!: number;
  isSenderReceiverMatch: boolean = false;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Extract sender ID from route parameters
      const senderId = params['id'];
      // Set sender ID
      this.sender = senderId;
      // Set receiver ID
      this.receiver = senderId;


      this.fetchMessages();
    });
  }

  fetchMessages() {
    this.messageService.getMessages().subscribe((data: Message[]) => {
      console.log(data);
      this.messages = data;
    });
  }

  addMessage() {
    if (this.sender !== this.receiver) {
      this.messageService.addMessage(this.newMessage, this.sender, this.receiver).subscribe(() => {
        console.log('Message added successfully');
        this.newMessage = '';
        this.fetchMessages();
      });
    } else {
      console.log('Sender and receiver IDs is the same. Cannot add message.');
    }
  }
  deleteMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      console.log('Message deleted successfully');
      this.fetchMessages();
    });
  }
}
