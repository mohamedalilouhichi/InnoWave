import {User} from "./User";

export interface Message {
  idMessage: number;
  sender: User;
  receiver: User;
  content: string;
  date: Date;
  reactions: string[];
  showDateTime: boolean;
  file: ArrayBuffer;
  fileUrl?: string; // Optional property for file URL
  fileName?: string;

}



