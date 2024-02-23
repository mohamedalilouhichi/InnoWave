import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { document } from '../../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly api_url = 'http://localhost:8089/ProjetPI';
  httpOptions = { headers:new HttpHeaders({'Content-Type':
  'application/json'})}
  constructor(private http: HttpClient) { }

  getdocument(): Observable<document[]> {
    return this.http.get<any[]>(`${this.api_url}/documents/retrieveAllDocuments`);
  }

  addDocuments(document: document): Observable<document> {
    return this.http.post<document>(`${this.api_url}/documents/addDocuments`, document  );
  }

  //addCandidature(candidature: Candidature ): Observable<Candidature> {
  //  return this.http.post<Candidature>(`${this.api_url}/addCandidatureAndAssignToStudentAndStage`, candidature);
  //}

  public updatedocument(document: document):Observable<document>{
    return this.http.put<document>(`${this.api_url}/documents/updatedocument`,document);
  }

  public removeDocuments(idDocuments: number):Observable<void>{
    return this.http.delete<void>(`${this.api_url}/documents/removeDocuments/{idDocuments}`);
  }
}

