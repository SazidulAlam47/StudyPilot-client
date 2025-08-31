type TDifficulty = 'easy' | 'medium' | 'hard';

type TLanguage = 'bengali' | 'english';

export type TQuestion = {
    text: string;
    options: string[];
    correctAnswer?: number;
};

export type TExam = {
    _id: string;
    topic: string;
    difficulty: TDifficulty;
    language: TLanguage;
    questions: TQuestion[];
    totalQuestions: number;
    submittedAnswers?: number[];
    correctAnswers?: number;
    score?: number;
    createdAt?: string;
};
