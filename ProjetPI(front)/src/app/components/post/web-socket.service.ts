import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';  // Import Observable

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private stompClient: any;
  private notifications = new Subject<string>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  public getWebSocket(): Observable<string> {
    return this.notifications.asObservable();
  }

  sendNotification(notification: any) {
    const destination = '/topic/comments';  // Update the destination according to your server configuration
    const body = JSON.stringify(notification);

    // Use stompClient.send instead of stompClient.next
    this.stompClient.send(destination, {}, body);
  }

  private initializeWebSocketConnection(): void {
    const socket = new SockJS('http://localhost:8089/ProjetPI/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('WebSocket Connected');

      // Update the subscription path to '/topic/comments'
      this.stompClient.subscribe('/topic/comments', (notification: any) => {
        if (notification.body) {
          console.log('Received WebSocket notification:', notification.body);
          this.notifications.next(notification.body);
        }
      });

    }, (error: any) => {
      console.error('WebSocket Error:', error);
    });
  }
}
