import { QuizQuestion } from './QuizQuestion';

export interface Domain {
  name: string;
  questions: QuizQuestion[];
}
