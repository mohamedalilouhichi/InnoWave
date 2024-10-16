import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages/all`);
  }

  addMessage(message: string | null, senderId: number, receiverId: number, file: File | null): Observable<Message> {
    const formData: FormData = new FormData();

    if (message !== null) {
      formData.append('content', message);
    }

    if (file !== null) {
      formData.append('file', file);
    }

    return this.http.post<Message>(`${this.API_URL}/messages/add/${senderId}/${receiverId}`, formData);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/messages/delete/${id}`, {});
  }
  addReaction(idMessage: number, reaction: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/messages/add-reaction/${idMessage}`,  reaction );
  }
  deleteReactions(idMessage: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/messages/${idMessage}/reactions`);
  }
  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/user/${username}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/user/all`);
  }

}
