import {User} from "./User";

export interface Message {
  idMessage: number;
  sender: User;
  receiver: User;
  content: string;
  date: Date;
  reactions: string[];
  showDateTime: boolean;
  file: File;
  isFile: boolean;
  fileName: string;
}
