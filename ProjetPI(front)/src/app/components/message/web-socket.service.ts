import { Injectable } from '@angular/core';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private serverUrl = 'http://localhost:8089/ProjetPI/ws';

  constructor() { }

  connect(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const socket = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, () => {
        observer.next(true ); // Connection established
      }, (error :any )=> {
        console.error('WebSocket connection error:', error);
        observer.next(false); // Connection failed
      });
    });
  }

  closeWebSocketConnection(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  subscribeToMessages(senderId: string): Observable<any> {
    const topic = `/topic/messages/${senderId}`;
    const subject = new Subject<any>();
    this.stompClient.subscribe(topic, (message: any) => {
      subject.next(JSON.parse(message.body));
    });
    return subject.asObservable();
  }

  send(topic: string, payload: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(topic, {}, JSON.stringify(payload));
    } else {
      console.error('WebSocket connection is not established.');
    }
  }
  sendMessage(message: string, senderId: number, receiverId: number, file: Blob | null, fileName: string, reactions: string[] | null) {
    const data = {
      sender: senderId,
      receiver: receiverId,
      content: message,
      file: file ? this.blobToBase64(file) : null,
      fileName: fileName,
      reactions: reactions
    };
    this.send(`/topic/messages/${receiverId}`, data);
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Extract base64 data from the result
      };
      reader.onerror = () => {
        reject('Error converting blob to base64');
      };
      reader.readAsDataURL(blob);
    });
  }
  deleteMessage(messageId: number,receiverId:number): void {
    const data = {
      messageId: messageId,
      receiver: receiverId,

    };
    this.send(`/topic/messages/${receiverId}`, data);
  }



}
