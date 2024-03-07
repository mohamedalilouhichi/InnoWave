import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Comment } from 'src/app/Models/comment';
import { post, Rating } from 'src/app/Models/post';
import { WebSocketService } from './web-socket.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8089/ProjetPI';
  constructor(private http: HttpClient,
    private webSocketService: WebSocketService,
  ) { }

  //---------------------Filter badword---------------------- 

  containsBadWord(inputString: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/checkBadWord`, { inputString });
  }

  // ------------------Ajouter une nouvelle post-------------------
  addPostToUser(post: post, idUser: number, title: string, description: string, file: File, creationdate: string): Observable<post> {
    const formData: FormData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file, file.name);  // Include the file name
    formData.append('creationdate', creationdate);
    formData.append('moyrating', '0'); // Initialize moyrating to 0

    return this.http.post<post>(`${this.baseUrl}/post/addPostToUser`, formData).pipe(
      catchError((error) => {
        console.error('Error adding post:', error);

        if (error && error.error && error.error.message) {
          const errorMessage = error.error.message.toLowerCase();

          if (errorMessage.includes('inappropriate content') || errorMessage.includes('should not be posted')) {
            const customErrorMessage = 'Post contains inappropriate content or contains a subject that should not be posted here. Please review your post before submitting.';
            console.error('Server error message:', customErrorMessage);
            return throwError(customErrorMessage);
          }
        }

        return throwError(error);
      })
    );
  }

  // -----------------------Récupérer toutes les postes--------------------
  retrieveAllPosts(): Observable<post[]> {
    return this.http.get<post[]>(`${this.baseUrl}/post/retrieve-all-Posts`);
  }
  //---------------------------retrieve post by id ----------------------------
  getPostbyid(idPost: number): Observable<post> {
    return this.http.get<post>(`${this.baseUrl}/post/${idPost}`);
  }


  // ---------------------Supprimer une post-------------------
  removePost(idPost: number): Observable<post[]> {
    return this.http.delete<post[]>(`${this.baseUrl}/post/remove-Post/${idPost}`);
  }

  // ---------------------Récupérer une post par son ID--------------
  retrievePostsByidUser(idUser: number): Observable<post[]> {
    return this.http.get<post[]>(`${this.baseUrl}/post/retrieve-Post/${idUser}`);
  }

  // -------------------------Mettre à jour une post ---------------------------
  modifyPost(formData: post): Observable<post[]> {
    const form = new FormData;

    form.append('file', formData.file);
    form.append('description', formData.description);

    form.append('title', formData.title);

    form.append('idPost', formData.idPost.toString());
    console.log(form);

    return this.http.put<post[]>(`${this.baseUrl}/post/modifyPostAffecttoUser`, form);
  }

  //---------------------convertir en pdf -----------------------------

  convertToPdf(id: number): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get('/api/convertToPdf/' + id, { headers: headers, responseType: 'arraybuffer' });
  }
  // --------------Récupérer toutes les commentaires affecter a une poste------------------
  retrieveAllcommentsAffectToidPost(idPost: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/comment/retrieveAllcommentsAffectToidPost/${idPost}`);
  }


  // -------------------Ajouter une nouvelle comment affecter a une poste et a un user--------------------
  addCommentToPostAndUser(comment: Comment, postId: number, userId: number): Observable<Comment> {
    const url = `${this.baseUrl}/comment/addCommentToPostAndUser/${postId}/${userId}`;
    return this.http.post<Comment>(url, comment).pipe(
      catchError((error) => {
        console.error('Error adding comment:', error);

        if (error && error.error && error.error.message) {
          const errorMessage = error.error.message.toLowerCase();

          if (errorMessage.includes('inappropriate content') || errorMessage.includes('should not be posted')) {
            // Replace the generic error message with your custom message
            const customErrorMessage = 'Comment contains inappropriate content or contains a subject that should not be posted here. Please review your comment before submitting.';
            console.error('Server error message:', customErrorMessage);
            return throwError(customErrorMessage);
          }
        }

        return throwError(error);
      })
    );
  }

  // -------------------Supprimer une commentaire-----------------
  removecomment(idComment: number): Observable<Comment[]> {
    return this.http.delete<Comment[]>(`${this.baseUrl}/comment/remove-Comment/${idComment}`);
  }

  // -----------------Mettre à jour une post------------------------
  modifycomment(idUser: number, idPost: number, idComment: number, comment: string): Observable<Comment[]> {
    return this.http.put<Comment[]>(`${this.baseUrl}/comment/modifyComment/${idComment}/${idUser}/${idPost}`, comment);
  }

 //--------------------add rating -------------------
 addRating(rating:Rating):Observable<post>{
  return  this.http.post<post>(`${this.baseUrl}/api/Post/Rating/addRating`,rating)

}
}