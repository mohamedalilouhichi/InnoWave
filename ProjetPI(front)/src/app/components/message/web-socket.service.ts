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
  sendMessage(message: string, senderId: number, receiverId: number) {
    const data = { sender: senderId, receiver: receiverId, content: message  };
    this.send(`/topic/messages/${receiverId}`, data);

  }


}
