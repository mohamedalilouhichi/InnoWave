import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { document } from '../../models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  readonly api_url = 'http://localhost:8089';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getdocument(): Observable<document[]> {
    return this.http.get<any[]>(
      `${this.api_url}/documents/retrieveAllDocuments`
    );
  }

  addDocument(form: FormData): Observable<any> {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };

    return this.http.post<any>(
      `
    http://localhost:8089/documents/documentsAdd`,
      form
    );
  }
  updateDocument(idDocuments: number, form: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };

    return this.http.put<any>(
      `http://localhost:8089/documents/documentsEdit/${idDocuments}`,
      form
    );
  }

  public removeDocuments(idDocuments: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api_url}/documents/removeDocuments/${idDocuments}`
    );
  }
  getDocumentById(idDocuments: number): Observable<document> {
    return this.http.get<document>(
      `http://localhost:8089/documents/retrieveDocuments/${idDocuments}`
    );
  }
  downloadDocument(fileName: string): Observable<Blob> {
    return this.http
      .get(`http://localhost:8089/documents/downloadDocument/${fileName}`, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error) => {
          console.error('Error downloading document:', error);
          return throwError(error);
        })
      );
  }
}
