import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  sender!: number;
  receiver!: number;
  showDateTime: boolean = false;
  showReactionOptions: { [key: string]: boolean } = {};
  private reactionTimeout: any;
  name!: string;
  showEmojiSelector: boolean = false;
  delMsg: string = "Message deleted";


  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const senderId = params['id'];
      this.sender = senderId;
      // this.receiver = senderId;


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

  deleteMessag(idMessage: number) {
    this.messageService.deleteMessage(idMessage).subscribe(() => {
        this.fetchMessages();
      }
    );
  }


  formatDate(date: Date): string {
    const messageDate = new Date(date);
    const currentDate = new Date();

    // Check if the message date is today
    if (this.isToday(messageDate, currentDate)) {
      return this.formatTime(messageDate);
    } else {
      return this.formatDateTime(messageDate);
    }
  }

  isToday(date: Date, currentDate: Date): boolean {
    return date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();
  }

  formatTime(date: Date): string {
    return date.toLocaleDateString('en-US', {weekday: 'long', hour: 'numeric', minute: 'numeric'});
  }

  formatDateTime(date: Date): string {
    const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'short'});
    const time = this.formatTime(date);
    return `${dayOfWeek}, ${time}`;
  }

  getTimeDifference(messageDate: any): string {
    // Convert the messageDate to a Date object if it's not already
    const date = typeof messageDate === 'string' ? new Date(messageDate) : messageDate;

    if (!(date instanceof Date && !isNaN(date.valueOf()))) {
      // If the date is not valid, return an error message
      return 'Invalid date';
    }

    const currentDate = new Date();
    const difference = Math.abs(currentDate.getTime() - date.getTime());
    const timeUnits = [
      {unit: 'd', milliseconds: 86400000},
      {unit: 'h', milliseconds: 3600000},
      {unit: 'm', milliseconds: 60000}
    ];

    for (const unit of timeUnits) {
      const value = Math.floor(difference / unit.milliseconds);
      if (value > 0) {
        return `sent ${value}${unit.unit} ago`;
      }
    }

    return `sent just now`;
  }

  addReaction(idMessage: number, reaction: string) {
    // Check if the message already contains any reaction
    const message = this.messages.find(msg => msg.idMessage === idMessage);

    if (message) {
      // Check if the reaction already exists for the current user
      const reactionIndex = message.reactions.indexOf(reaction);

      if (reactionIndex !== -1) {
        // Reaction exists, so remove it
        message.reactions.splice(reactionIndex, 1);
        // Update the reaction on the server
        this.messageService.deleteReactions(idMessage).subscribe(() => {
          console.log('Reaction deleted successfully');
          // Update the messages list to reflect the updated reaction
          this.fetchMessages();
        });
      } else {
        // Reaction doesn't exist, so add it
        if (message.reactions.length === 0) {
          if (this.isValidReaction(reaction)) {
            this.messageService.addReaction(idMessage, reaction).subscribe(() => {
              console.log('Reaction added successfully');
              // Update the messages list to reflect the added reaction
              this.fetchMessages();
            });
          } else {
            console.log('Invalid reaction.');
          }
        } else {
          console.log('Message already has a reaction.');
        }
      }
    } else {
      console.log('Message not found.');
    }
  }

  deleteReactions(idMessage: number) {
    this.messageService.deleteReactions(idMessage).subscribe(() => {
      console.log('All reactions deleted successfully');
      this.fetchMessages(); // Refresh messages after deletion
    });
  }

  isValidReaction(reaction: string): boolean {
    const validReactions = ['👍', '❤️', '😂', '😯', '😢', '😡']; // List of valid reactions
    return validReactions.includes(reaction);
  }


  toggleReactionOptions(idMessage: number) {
    this.showReactionOptions[idMessage] = !this.showReactionOptions[idMessage];
  }

  hideReactionOptions(idMessage: number) {
    this.showReactionOptions[idMessage] = false;
  }

  replyToMessage(idMessage: number) {
    // Implement reply functionality here, such as opening a reply form or sending a reply
    console.log('Replying to message with ID:', idMessage);
  }

  toggleEmojiSelector() {
    this.showEmojiSelector = !this.showEmojiSelector;
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
  }

}
