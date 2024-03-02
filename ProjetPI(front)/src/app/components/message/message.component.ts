import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {MessageService} from "./message.service";
import {Message} from "./message";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { saveAs } from 'file-saver';
import {WebSocketService} from "./web-socket.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],

})
export class MessageComponent implements OnInit , OnDestroy{


  showTitle: boolean = true;

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

  message! : Message | null;
  chatMinimized: boolean = false;
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  webSocketSubscription: Subscription | undefined;

  constructor(
    private webSocketService: WebSocketService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone

  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const senderId = params['id'];
      const receiverId = params['receiver'];

      this.sender = +senderId;
      this.receiver = receiverId;
      this.connectWebSocket();

      this.fetchMessages();
    });
  }

  ngOnDestroy(): void {
    this.closeWebSocketConnection();
  }

  connectWebSocket(): void {
    if (this.sender) { // Ensure sender is not null or undefined
      this.webSocketService.connect().subscribe(
        (connected: boolean) => {
          if (connected) {
            console.log('WebSocket connection established.');
            // Subscribe to WebSocket messages
            this.subscribeToMessages(); // Remove senderId argument from subscribeToMessages
          } else {
            console.error('Failed to establish WebSocket connection.');
            // Handle failed connection
          }
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          // Handle connection error
        }
      );
    } else {
      console.error('sender is null or undefined.'); // Handle sender being null or undefined
    }
  }

  subscribeToMessages(): void {
    // Subscribe to WebSocket messages
    if (this.sender !== null && this.sender !== undefined) {
      const senderId: string = this.sender.toString();
      console.log('Subscribing to messages for sender ID:', senderId);
      this.webSocketSubscription = this.webSocketService.subscribeToMessages(senderId).subscribe(
        (message: any) => {
          this.ngZone.run(() => {
            console.log('Received message:', message);
            // Add the received message to the messages array
            this.messages.push(message);
            this.fetchMessages();
            // Manually trigger change detection
            this.cdr.detectChanges();
          });
        },
        (error) => {
          console.error('Error subscribing to messages:', error);
          // Handle subscription error
        }
      );
    } else {
      console.error('Sender is null or undefined.');
      // Handle sender being null or undefined
    }
  }

  closeWebSocketConnection(): void {
    this.webSocketService.closeWebSocketConnection();
  }



  fetchMessages() {
    this.messageService.getMessages().subscribe((data: Message[]) => {
      console.log(data);
      this.messages = data;
    });
  }
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // Get the selected file
      this.selectedFile = fileList[0];
      // Generate a URL for the selected file
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
    }
  }
  minimizeChat() {
    this.chatMinimized = !this.chatMinimized; // Toggle the chatMinimized property
  }
  addMessage() {
    if (this.sender !== this.receiver) {
      if (this.newMessage && this.selectedFile) {
        // Send both message and file
        this.messageService
          .addMessage(this.newMessage, this.sender, this.receiver, this.selectedFile)
          .subscribe(() => {
            console.log('Message with attachment added successfully');
            this.sendMessage(this.newMessage, this.sender, this.receiver); // Sending the message via WebSocket
            this.newMessage = '';
            this.fetchMessages();
          });
      } else if (this.newMessage) {
        // Send message only
        this.messageService
          .addMessage(this.newMessage, this.sender, this.receiver, null)
          .subscribe((newMessage: Message) => {
            console.log('Message added successfully');
            if (this.sender === newMessage.sender.idUser) {
              // If the message sender is the current user, manually add it to the messages array
              this.messages.push(newMessage);
            }
            this.sendMessage(this.newMessage, this.sender, this.receiver); // Sending the message via WebSocket
            this.newMessage = '';
            this.selectedFile = null;
          });
      } else if (this.selectedFile) {
        // Send attachment only
        this.messageService
          .addMessage(null, this.sender, this.receiver, this.selectedFile)
          .subscribe(() => {
            console.log('Attachment added successfully');
            this.fetchMessages();
          });
      } else {
        console.log('No message or attachment provided');
      }
    } else {
      console.log('Sender and receiver IDs are the same. Cannot add message.');
    }
  }
  sendMessage(message: string, senderId: number, receiverId: number) {
    this.webSocketService.sendMessage(message, senderId, receiverId);
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
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  }

  formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
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
    // Find the message
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
        message.reactions.push(reaction);
        // Update the reaction on the server
        this.messageService.addReaction(idMessage, reaction).subscribe(() => {
          console.log('Reaction added successfully');
          // Update the messages list to reflect the updated reaction
          this.fetchMessages();
        });
      }
    } else {
      console.log('Message not found.');
    }
  }




  toggleReactionOptions(idMessage: number) {
    this.showReactionOptions[idMessage] = !this.showReactionOptions[idMessage];
  }

  hideReactionOptions(idMessage: number) {
    this.showReactionOptions[idMessage] = false;
  }

  telechargerDocument(idMessage: number) {
    const url = ' http://localhost:8089/ProjetPI/messages/telecharger-pdf/'+idMessage;
    this.http.get(url, { observe: 'response', responseType: 'blob' })
      .subscribe((response: HttpResponse<Blob>) => {
        this.telechargerFichier(response.body);
      });
  }

  telechargerFichier(data: Blob | null) {
    if (data !== null) {
      const nomFichier = 'doc.pdf';
      saveAs(data, nomFichier);
    }

} }
