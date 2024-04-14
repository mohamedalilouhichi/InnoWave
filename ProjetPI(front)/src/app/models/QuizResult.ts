import { User } from "./User";

export class QuizResult {
    constructor(
        public user: User,
        public totalScore: number,
        public passed: boolean,
        public quizId: number, // Assuming there's an ID to identify which quiz was taken
        public answers: any[] // This could be a more detailed structure depending on your quiz design
    ) {}
}
