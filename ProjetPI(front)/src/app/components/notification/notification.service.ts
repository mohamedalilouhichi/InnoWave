// notification.service.ts

import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: any;
  private notifications = new Subject<any>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  public getWebSocket(): Observable<any> {
    return this.notifications.asObservable();
  }

  sendNotification(notification: any) {
    const destination = '/topic/comments';
    this.stompClient.send(destination, {}, JSON.stringify(notification)); // Send as JSON
  }

  private initializeWebSocketConnection(): void {
    const socket = new SockJS('http://localhost:8089/ProjetPI/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('WebSocket Connected');

      this.stompClient.subscribe('/topic/comments', (notification: any) => {
        if (notification.body) {
          console.log('Received WebSocket notification:', notification.body);
          this.notifications.next(JSON.parse(notification.body));
        }
      });

    }, (error: any) => {
      console.error('WebSocket Error:', error);
    });
  }
}
