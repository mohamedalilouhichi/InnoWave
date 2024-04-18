import { QuizQuestion } from "./QuizQuestion";
import { User } from "./User";

export class QuizResult {
    constructor(
        public user: User,
        public quizId: number,
        public questions: QuizQuestion[],
        public score: number,
        public passed: boolean
    ) {}
}
