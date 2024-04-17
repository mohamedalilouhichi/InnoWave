import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { post } from 'src/app/Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostinteractionService  {
  private baseUrl = 'http://localhost:8089/ProjetPI/api';

  constructor(private http: HttpClient) { }

  addLikeToPostAndUser(idPost: number, idUser: number): Observable<post> {
    return this.http.post<post>(`${this.baseUrl}/likes/addLike?idPost=${idPost}&idUser=${idUser}`, {});
  }
  
  addSaveToPostAndUser(idPost: number, idUser: number): Observable<post> {
    return this.http.post<post>(`${this.baseUrl}/saves/addSave?idPost=${idPost}&idUser=${idUser}`, {});
  }
  getSavedPostsForUser(userId: number): Observable<post[]> {
    return this.http.get<post[]>(`${this.baseUrl}/saves/saved-posts/${userId}`);
  }
}