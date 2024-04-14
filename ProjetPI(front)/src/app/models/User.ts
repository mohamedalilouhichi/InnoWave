import { Competences } from './competences';
export class User {
  public competences: Competences[];
    constructor(
      public userId: number,
      public name: string,
      public email: string,
      public Historique : string, 
      public level: string,
      public section: string,
      
      
    ) {
      this.competences = []; // Initialisez les compétences comme un tableau vide
    }
  }