import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../../models/candidature';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  readonly api_url = 'http://localhost:8089';
  httpOptions = { headers:new HttpHeaders({'Content-Type':
  'application/json'})}

  constructor(private http: HttpClient) { }

  getCandidature(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.api_url}/retrieveAllCandidatures`);
  }
  AcceptCandidature(e:any): Observable<any> {
    console.log(e)
    return this.http.get<any>(`${this.api_url}/AcceptCandidtature/`+e.idCandidature);

  }
  RefuseCandidature(e:any): Observable<any> {
    return this.http.get<any>(`${this.api_url}/RefuseCandidature/`+e.idCandidature);
  }


  addCandidacy(formData:FormData): Observable<Candidature[]> {
    
    return this.http.post<Candidature[]>(`${this.api_url}/addCandidacy`, formData  );
  }


  
 /* public updateCandidature(candidature: Candidature):Observable<Candidature>{
    return this.http.put<Candidature>(`${this.api_url}/updateCandidature`,candidature);
  }
*/


  public deleteCandidature(idCandidature: number):Observable<void>{
    return this.http.delete<void>(`${this.api_url}/removeCandidature/${idCandidature}`);
  }

  public addCandidatureAndAssignToStudentAndStage(formData : FormData,user:string,stage:string):Observable<Candidature[]>{
    return this.http.post<Candidature[]>(`${this.api_url}/addCandidatureAndAssignToStudentAndStage/`+user+`/`+stage ,formData);
  }

  retrieveCandidature(idCandidature:number):Observable<Candidature>
  {
    return this.http.get<Candidature>(`${this.api_url}/retrieveCandidature/${idCandidature}`);
  }


  retrieveCandidacyByIdUser(idUser: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.api_url}/retrieveCandidacyByIdUser/${idUser}`);
  }


  // Mettre à jour une post (si nécessaire, vous pouvez ajouter une méthode spécifique)
  updateCandidature(formData: Candidature): Observable<Candidature[]> {    
    const form = new FormData;

  form.append('cv', formData.cv);
  form.append('name', formData.name);

  form.append('surname', formData.surname);
  form.append('level', formData.level);

  form.append('idCandidature', formData.idCandidature.toString());
  console.log(form);

    return this.http.put<Candidature[]>(`${this.api_url}/updateCandidature`, form);
  }


  convertToPdf(idCandidature: number): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
    return this.http.get('/convertToPdf/' + idCandidature, { headers: headers, responseType: 'arraybuffer' });
  }
}
