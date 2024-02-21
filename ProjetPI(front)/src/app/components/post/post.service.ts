import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { comment } from 'src/app/Models/comment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8089/ProjetPI'; 
  constructor(private http: HttpClient) { }
    // Récupérer toutes les postes
    getPost(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/post/retrieve-all-Posts`);
  }
  getComment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/post/retrieve-all-Comments`);
}
   // Récupérer une post par son ID
   getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/post/retrieve-Post/${id}`);
  }
     // Récupérer une post par son ID
     getCommentById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/post/retrieve-Comment/${id}`);
    }
   // Ajouter une nouvelle post
   addPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/post/addPost`, post);
   
  }
     // Ajouter une nouvelle comment 
     addCommentToPost(postId: number, comment: Comment): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/comment/add-commentAffToPost/${postId}`, comment);
    }
    // Mettre à jour une post (si nécessaire, vous pouvez ajouter une méthode spécifique)
    updatePost( post: any): Observable<any> {
      // Cette ligne est juste un exemple, adaptez-la selon la structure de votre API si une méthode de mise à jour est nécessaire
      return this.http.put<any>(`${this.baseUrl}/post/modify-Post`, post);
    }
   // Mettre à jour un commentaire (si nécessaire, vous pouvez ajouter une méthode spécifique)
       updateComment( post: any): Observable<any> {
         // Cette ligne est juste un exemple, adaptez-la selon la structure de votre API si une méthode de mise à jour est nécessaire
          return this.http.put<any>(`${this.baseUrl}/post/modify-Comment`, comment);
        }
  
    // Supprimer une post
    deletePost(post: any): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/post/remove-Post`, {body: post} );
    } 
  // Supprimer une post
  deleteComment(post: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comment/remove-Comment`, {body: comment} );
  } 
}
