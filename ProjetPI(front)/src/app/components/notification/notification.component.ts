// notification.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Array<{ postId: number, describ: string, userId: number }> = [];
  private notificationsSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) {}

//utilisée pour appeler la fonction subscribeToNotifications() afin de s'abonner aux notifications
  ngOnInit(): void {
    this.subscribeToNotifications();
  }
//utilisée pour se désabonner des notifications afin d'éviter des fuites de mémoire
  ngOnDestroy(): void {
    this.notificationsSubscription?.unsubscribe();
  }
//esponsable de l'abonnement aux notifications provenant du service NotificationService
  private subscribeToNotifications(): void {
    this.notificationsSubscription = this.notificationService.getWebSocket().subscribe(
      (notification: string) => {
        // Les notifications sont stockées dans un tableau notifications
        const [postId, describ, userId] = notification.split(' ');
  
        // Create an object with separated values
        const separatedNotification = {
          postId: parseInt(postId, 10),  // Convert to integer if postId is a number
          describ,
          userId: parseInt(userId, 10),  // Convert to integer if userId is a number
        };
  
        // Push the separated notification to the notifications array
        this.notifications.push(separatedNotification);
      },
      (error: any) => {
        console.error('Error subscribing to notifications:', error);
      }
    );
  }
  
  
}
