import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  chatbotURL = 'http://localhost:5000/chatRes/';

  constructor(private http: HttpClient) { }

  getChatbotResponse(message: string): Observable<any> {
    const encodedMessage = encodeURIComponent(message); // Encode the message
    const url = `${this.chatbotURL}${encodedMessage}`;
    return this.http.get<any>(url);
  }}
