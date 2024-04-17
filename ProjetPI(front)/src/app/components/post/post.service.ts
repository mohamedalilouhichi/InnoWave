import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Comment } from 'src/app/Models/comment';
import { post, Rating } from 'src/app/Models/post';
import { WebSocketService } from './web-socket.service';
import { Image } from 'src/app/Models/image';

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
  addPostToUser(post: post, idUser: number, title: string, description: string, file: File, creationdate: string , image: Image[]): Observable<post> {
    const formData: FormData = new FormData();
    formData.append('idUser', idUser.toString());
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file, file.name);  // Include the file name
    formData.append('creationdate', creationdate);
    formData.append('moyrating', '0'); // Initialize moyrating to 0
    const imageIds: number[] = image.map(image => image.id).filter(id => id !== undefined) as number[];
    const idString: string = imageIds.join(' ');

    formData.append('images', idString); 

    return this.http.post<post>(`${this.baseUrl}/post/addPostToUser`, formData, ).pipe(
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
   //--------------------add rating -------------------
   addRating(rating: Rating): Observable<post> {
    return this.http.post<post>(`${this.baseUrl}/api/Post/Rating/addRating`, rating)
  }
  updateRating(rating: Rating): Observable<Rating> {
    const url = `${this.baseUrl}/api/Post/Rating/updateRating`; 
    return this.http.put<Rating>(url, rating);
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
  modifyPost(formData: post, image: Image[]): Observable<post[]> {
    const form = new FormData;
    form.append('file', formData.file);
    form.append('description', formData.description);

    form.append('title', formData.title);

    form.append('idPost', formData.idPost.toString());
    const imageIds: number[] = image.map(image => image.id).filter(id => id !== undefined) as number[];
    const idString: string = imageIds.join(' ');

    form.append('images', idString); 
   

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
  // -------------------ajouter une reponse-----------------
  saveReply(Comment:Comment):Observable<Comment>{
    //return  this.http.post<Event>("http://localhost:8222/api/Event/Events/addEvent",Event)
    return this.http.delete<Comment>(`${this.baseUrl}/comment/ReplyComment`);
  }
  // -------------------Supprimer une commentaire-----------------
  removecomment(idComment: number): Observable<Comment[]> {
    return this.http.delete<Comment[]>(`${this.baseUrl}/comment/remove-Comment/${idComment}`);
  }

  // -----------------Mettre à jour une post------------------------
  modifycomment(idUser: number, idPost: number, idComment: number, comment: string): Observable<Comment[]> {
    return this.http.put<Comment[]>(`${this.baseUrl}/comment/modifyComment/${idComment}/${idUser}/${idPost}`, comment);
  }

 

  // --------------------remove rating -------------------
  removeRating(rating: Rating): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Post/Rating/removeRating`, { body: rating })
      .pipe(catchError(this.handleError));
  }

  // --------------------retrieve all ratings -------------------
  retrieveAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/api/Post/Rating/AllRating`)
      .pipe(catchError(this.handleError));
  }

  //---------Handlererror---------------
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // You can handle errors here, e.g., show a user-friendly message or log the error
    return new Observable<never>();
  }
 //----------------Image--------------
 public list(): Observable<Image[]> {
  return this.http.get<Image[]>(`${this.baseUrl}/api/Post/cloudinary/list`);
}
public imagesForPost(idPost : number): Observable<Image[]> {
  return this.http.get<Image[]>(`${this.baseUrl}/api/Post/cloudinary/list/`+idPost);
}

public uploadForPost(image: File,idPost:number): Observable<any> {
  const formData = new FormData();
  formData.append('multipartFile', image);
  return this.http.post<any>(`${this.baseUrl}/api/Post/cloudinary/upload/`+idPost, formData);
}
public upload(image: File): Observable<any> {
  const formData = new FormData();
  formData.append('multipartFile', image);
  return this.http.post<any>(`${this.baseUrl}/api/Post/cloudinary/upload`, formData);
}

public delete(id: any): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/api/Post/cloudinary/delete/${id}`);
}
}
