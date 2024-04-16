import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChatbotService} from "./chatbot.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'] ,
  animations: [
    trigger('pulseAnimation', [
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('void => active', animate('500ms ease-in')),
      transition('active => void', animate('500ms ease-out'))
    ])
  ]
})
export class ChatbotComponent {

  isChatFormVisible: boolean = false;

  chatForm = new FormGroup({
    message: new FormControl('')
  });
  recognition = new webkitSpeechRecognition();
  finalTranscript = '';
  isMicIconActive = false;



  constructor(private chatbotService: ChatbotService) {
    this.setupSpeechRecognition();
  }

  setupSpeechRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event : any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.chatForm.controls['message'].setValue(this.finalTranscript + interimTranscript);
    };

    this.recognition.onerror = (event: any) => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }

  startListening() {
    this.finalTranscript = ''; // Reset the final transcript on start.
    this.recognition.start();
    this.toggleIcon();

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    if (startBtn) {
      startBtn.style.display = 'none';
    }
    if (stopBtn) {
      stopBtn.style.display = 'inline-block';
    }
  }

  toggleListening() {
    if (this.isMicIconActive) {
      this.stopListening();
    } else {
     this.startListening();
    }
  }

  stopListening() {
    this.recognition.stop();
    this.toggleIcon();

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    if (startBtn) {
      startBtn.style.display = 'inline-block';
    }
    if (stopBtn) {
      stopBtn.style.display = 'none';
    }
  }

  toggleIcon() {
    this.isMicIconActive = !this.isMicIconActive;
  }


  add() {
    const messageControl = this.chatForm.get('message');

    // Perform a null check on messageControl
    if (messageControl) {
      const message: string | null = messageControl.value;

      // Check if message is not null before adding it to the chat
      if (message !== null) {
        // Add the user's message to the chat
        this.addMessageToChat(message);

        // Call the chatbot service to get the response
        this.chatbotService.getChatbotResponse(message).subscribe(
          (response) => {
            // Assuming response structure is as anticipated; adjust as necessary
            const randomIndex = Math.floor(Math.random() * response.data.responses.length);
            const chatbotResponse = response.data.responses[randomIndex];

            // Add the chatbot response to the chat
            this.addMessageToChat(chatbotResponse);
          },
          (error) => {
            console.error('Error communicating with the chatbot API', error);
          }
        );
      } else {
        console.error('Message is null.');
      }
    } else {
      console.error('Message form control not found.');
    }

    // Clear the message input after sending
    if (messageControl) {
      messageControl.setValue('');
    }

    // Hide the stop button and show the start button after sending
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');

    if (startBtn) {
      startBtn.style.display = 'inline-block';
    }
    if (stopBtn) {
      stopBtn.style.display = 'none';
    }
  }

  addMessageToChat(message: string) {
    // Append the message to the chat messages content
    const messagesContent = document.querySelector('.messages-content');
    if (messagesContent) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.textContent = message;
      messagesContent.appendChild(messageElement);
    }
  }
  toggleChatForm(): void {
    this.isChatFormVisible = !this.isChatFormVisible;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.toggleChatForm();
    }
  }
}

