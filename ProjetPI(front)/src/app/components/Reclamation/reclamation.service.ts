import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from 'src/app/models/reclamation';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  
  readonly API_URL = 'http://localhost:8089/ProjetPI'; 

  constructor(private http: HttpClient) { }


  // Récupérer toutes les compétences
  getReclamation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reclamation/all`);
  }
    // Récupérer une compétence par son ID
    getReclamationById(id: number): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/reclamation/get/${id}`);
    }

  // Ajouter une nouvelle compétence
  addReclamation(reclamation: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/reclamation/add`, reclamation);
  }
  removeReclamations(idReclamation: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/reclamation/delete/${idReclamation}`, {});
  }
  // removeReclamations(idReclamation: number): Promise<boolean> {
  //   const url = `${this.API_URL}/reclamation/delete/${idReclamation}`;
  //   return this.http.delete<boolean>(url)
  //     .toPromise()
  //     .then(response => {
  //       if (typeof response === 'boolean') {
  //         return response;
  //       } else {
  //         throw new Error('Invalid response received from the server.');
  //       }
  //     });
  // }

  updateReclamation(reclamation: any): Observable<any> {
    return this.http.put(`${this.API_URL}/reclamation/update`, reclamation);
  }
}
