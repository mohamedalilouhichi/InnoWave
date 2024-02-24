import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Message2} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly API_URL = 'http://localhost:8089/ProjetPI';

  constructor(private http: HttpClient) {}

  getmessage(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages/all`);
  }

  addmessage(message: string,sender:number,receiver:number): Observable<Message> {


    return this.http.post<Message>(`${this.API_URL}/messages/add/${message}/${sender}/${receiver}`, message);
  }


  deletemessage(message: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/messages/delete/${message}`);
  }


}
