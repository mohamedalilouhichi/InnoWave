import {Message} from "./message";

export interface User {
    idUser: number;
    username : string;
    lastMessage: Message | null;

  }
