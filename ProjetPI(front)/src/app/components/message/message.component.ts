import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {MessageService} from "./message.service";
import {Message} from "./message";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {WebSocketService} from "./web-socket.service";
import { Subscription} from "rxjs";
import Swal from 'sweetalert2';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],

})
export class MessageComponent implements OnInit , OnDestroy{


  bannedWords: string[] = [];

  messages: Message[] = [];
  newMessage: string = '';
  sender!: number;
  receiver!: number;
  showDateTime: boolean = false;
  showReactionOptions: { [key: string]: boolean } = {};
  name!: string;
  delMsg: string = "Message deleted";

  message! : Message | null;
  chatMinimized: boolean = false;
  selectedFile: File | null = null;
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
    this.http.get('assets/bad-word.txt', { responseType: 'text' })
      .subscribe(
        (data: string) => {
          // Split the data by newline to get an array of words
          this.bannedWords = data.split('\n');
          console.log('Banned words:', this.bannedWords); // Log the loaded banned words
        },
        (error) => {
          console.error('Failed to load banned words:', error);
        }
      );
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
      // Upload the file
    }
  }
  telechargerDocument(id: number) {
    const url = 'http://localhost:8089/ProjetPI/messages/telecharger-pdf/'+id;
    this.http.get(url, { observe: 'response', responseType: 'blob' })
      .subscribe((response: HttpResponse<Blob>) => {
        this.telechargerFichier(response.body);
      });
  }

  telechargerFichier(data: Blob | null) {
    if (data !== null) {
      const nomFichier = 'Upload.pdf';
      saveAs(data, nomFichier);
    }

  }

  minimizeChat() {
    this.chatMinimized = !this.chatMinimized; // Toggle the chatMinimized property
  }
  addMessage() {
    if (this.sender !== this.receiver) {
      if (this.newMessage || this.selectedFile) {
        if (this.selectedFile) {
          // Convert the selected file to a Blob
          const fileBlob = new Blob([this.selectedFile], { type: this.selectedFile.type });

          // Create a new File object with additional properties
          const file = new File([fileBlob], this.selectedFile.name, { lastModified: new Date().getTime() });

          this.messageService
            .addMessage(this.newMessage, this.sender, this.receiver, file)
            .subscribe((newMessage: Message) => {
              console.log('Message with file added successfully');
              if (this.sender === newMessage.sender.idUser) {
                this.messages.push(newMessage);
              }
              this.sendMessage(this.newMessage, this.sender, this.receiver, file, newMessage.fileName);
              this.newMessage = '';
              this.selectedFile = null;
            });
        } else {
          const filteredMessage = this.filterBadWords(this.newMessage);
          if (filteredMessage) {
            this.messageService
              .addMessage(filteredMessage, this.sender, this.receiver, null)
              .subscribe((newMessage: Message) => {
                console.log('Message added successfully');
                if (this.sender === newMessage.sender.idUser) {
                  this.messages.push(newMessage);
                }
                this.sendMessage(filteredMessage, this.sender, this.receiver, null, null);
                this.newMessage = '';
                this.selectedFile = null;
              });
          } else {
            console.log('Message contains banned words. Please revise.');
          }
        }
      } else {
        console.log('No message or file provided');
      }
    } else {
      console.log('Sender and receiver IDs are the same. Cannot add message.');
    }
  }


  filterBadWords(message: string): string {
    // Convert message to lowercase for case-insensitive comparison
    let censoredMessage = message.toLowerCase();

    // Check if the message contains any banned words
    for (const bannedWord of this.bannedWords) {
      const regex = new RegExp('\\b' + bannedWord.trim() + '\\b', 'gi'); // Create case-insensitive regular expression for each banned word
      const asterisks = bannedWord.replace(/\w/g, '*'); // Create a string of asterisks with the same length as the banned word
      censoredMessage = censoredMessage.replace(regex, asterisks); // Replace the banned word with asterisks if it's entirely composed of letters
    }

    return censoredMessage;
  }



  sendMessage(message: string, senderId: number, receiverId: number, file: File | null, fileName: string | null, reactions: string[] | null = null) {
    const data = { sender: senderId, receiver: receiverId, content: message, fileName: fileName || '' };
    this.webSocketService.sendMessage(message, senderId, receiverId, file, fileName || '', reactions);
  }





  deleteMessag(idMessage: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call WebSocketService to delete the message
        this.webSocketService.deleteMessage(idMessage, this.receiver);

        // Call MessageService to delete the message via HTTP
        this.messageService.deleteMessage(idMessage).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          });
          this.fetchMessages();
          this.sendMessage(this.delMsg, this.sender, this.receiver, null, null);
        });
      }
    });
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



 }
