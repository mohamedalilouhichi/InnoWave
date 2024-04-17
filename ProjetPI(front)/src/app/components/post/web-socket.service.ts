import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';  
//gerer les connexions websocket
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
   //Stocke la référence au client STOMP qui sera utilisé pour la communication WebSocket.
  private stompClient: any;
  private notifications = new Subject<string>();

  constructor() {
    // Initialise la connexion WebSocket en créant une instance de SockJS
    this.initializeWebSocketConnection();
  }
  // Renvoie un Observable qui permet à d'autres composants de s'abonner aux notifications WebSocket émises par ce service.
  public getWebSocket(): Observable<string> {
    return this.notifications.asObservable();
  }
 //Envoie une notification au serveur en utilisant le client STOMP
  sendNotification(notification: any) {
    const destination = '/topic/comments';  // Update the destination according to your server configuration
    const body = JSON.stringify(notification);

    // Use stompClient.send instead of stompClient.next
    this.stompClient.send(destination, {}, body);
  }

  private initializeWebSocketConnection(): void {
    const socket = new SockJS('http://localhost:8089/ProjetPI/ws');
    this.stompClient = Stomp.over(socket);

    //Création du client STOMP
    this.stompClient.connect({}, () => {
      console.log('WebSocket Connected');

      // Connexion au serveur WebSocket
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
