export type TQuestion = {
    text: string;
    options: string[];
    correctAnswer?: number;
};

export type TExam = {
    _id: string;
    topic: string;
    questions: TQuestion[];
    totalQuestions: number;
    submittedAnswers?: number[];
    correctAnswers?: number;
    score?: number;
    createdAt?: string;
};
