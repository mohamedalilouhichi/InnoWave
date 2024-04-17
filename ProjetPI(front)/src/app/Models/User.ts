import { Message } from "./message";
import { Competences } from './competences';

export interface User {
  idUser: number;
  username: string;
  lastMessage: Message | null;
}

export class User {
  public competences: Competences[];

  constructor(
    public userId: number,
    public name: string,
    public email: string,
    public Historique: string,
    public level: string,
    public section: string,
  ) {
    this.competences = []; // Initialize competences as an empty array
  }
}

