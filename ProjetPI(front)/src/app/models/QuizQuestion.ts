import { Choice } from './choice';

export interface QuizQuestion {
  id: number;
  text: string;
  choices: Choice[];
  answer: string;
}
