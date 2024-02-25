import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages/all`);
  }

  addMessage(message: string, senderId: number, receiverId: number): Observable<Message> {

    return this.http.post<Message>(`${this.API_URL}/messages/add/${senderId}/${receiverId}`,message);
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/messages/delete/${messageId}`);
  }
}
