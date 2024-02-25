import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8089/ProjetPI'; 
  constructor(private http: HttpClient) { }

    // Ajouter une nouvelle post
    addPostToUser(formData:FormData): Observable<post[]> {
      return this.http.post<post[]>(`${this.baseUrl}/post/addPostToUser`, formData);
    }

    // Récupérer toutes les postes
    retrieveAllPosts(): Observable<post[]> {
      return this.http.get<post[]>(`${this.baseUrl}/post/retrieve-all-Posts`);
  }
    // Supprimer une post
    removePost(idPost: number): Observable<post[]> {
      return this.http.delete<post[]>(`${this.baseUrl}/post/remove-Post/${idPost}`);
    }
      // Récupérer une post par son ID
      retrievePostsByidUser(idUser: number): Observable<post> {
    return this.http.get<post>(`${this.baseUrl}/post/retrieve-Post/${idUser}`);
  }
    // Mettre à jour une post (si nécessaire, vous pouvez ajouter une méthode spécifique)
    modifyPost(formData: FormData): Observable<post[]> {    
      return this.http.put<post[]>(`${this.baseUrl}/post/modify-Post`, formData);
    }
  
     // Récupérer toutes les commentaires affecter a une poste
     retrieveAllcommentsAffectToidPost(idPost: number): Observable<Comment> {
      return this.http.get<Comment>(`${this.baseUrl}/comment/retrieveAllcommentsAffectToidPost/${idPost}`);
    }
    
      // Ajouter une nouvelle comment affecter a une poste et a un user
      addCommentToPostAndUser(comment: Comment, idPost: number, idUser: number): Observable<Comment> {
        const url = `${this.baseUrl}/comment/addCommentToPostAndUser/${idPost}/${idUser}`;
        return this.http.post<Comment>(url, comment);
      }


   // Supprimer une commentaire
   removecomment(idComment: number): Observable<Comment[]> {
      return this.http.delete<Comment[]>(`${this.baseUrl}/comment/remove-Comment/${idComment}`);
    }
      // Mettre à jour une post (si nécessaire, vous pouvez ajouter une méthode spécifique)
      modifycomment(idUser: number , idPost:number , idComment:number,comment: string): Observable<Comment[]> {    
        return this.http.put<Comment[]>(`${this.baseUrl}/comment/modifyComment/${ idComment}/${idUser}/${idPost}`, comment);
      }
     
}
