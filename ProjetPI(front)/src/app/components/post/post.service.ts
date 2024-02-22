import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Comment } from 'src/app/Models/comment';
import { post } from 'src/app/Models/post';
import { Comment as PostComment } from 'src/app/Models/comment';

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
  
  getCommentsForUser(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comment/getCommentsForUser/${userId}`);
  }
   // Récupérer une post par son ID
   getPostById(id: number): Observable<post> {
    return this.http.get<post>(`${this.baseUrl}/post/retrieve-Post/${id}`);
  }
 
   // Ajouter une nouvelle post
   addPost(post: post): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/post/addPost`, post);
  }
     // Ajouter une nouvelle comment 
     addCommentToPost(postId: number, content: string): Observable<any> {
      const newComment: PostComment = {
        idComment: 0,
        description: content,
        commdate: new Date(),
        likescomment: 0,
        mostlikedcomment: false,
        newstcomment: true
      };
  
      return this.http.post<any>(`${this.baseUrl}/comment/add-commentAffToPost/${postId}`, newComment);
    }
    
    // Mettre à jour une post (si nécessaire, vous pouvez ajouter une méthode spécifique)
    modifyPost(post: post): Observable<post> {
      const formData: FormData = new FormData();
      
      if (post.file) {
        formData.append('file', post.file);
      }
    
      // Append other post attributes to formData
    
      return this.http.put<post>(`${this.baseUrl}/modify-Post/${post.idPost}`, formData);
    }
  
    // Supprimer une post
    removePost(idPost: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/post/remove-Post/${idPost}`);
    }
  // Supprimer une post
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comment/remove-Comment/${commentId}`);
  }
}
