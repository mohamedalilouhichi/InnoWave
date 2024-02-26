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
  deleteMessage(houss: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/messages/delete/${houss}`, {});
  }
  addReaction(idMessage: number, reaction: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/messages/add-reaction/${idMessage}`,  reaction );
  }
  deleteReactions(idMessage: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/messages/${idMessage}/reactions`);
  }

}
