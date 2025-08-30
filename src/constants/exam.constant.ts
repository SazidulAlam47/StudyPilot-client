import createOptions from '../utils/createOptions';

export const difficulties = ['easy', 'medium', 'hard'];
export const languages = ['english', 'bengali'];
export const questionsNumbers = [5, 10, 15, 20];

export const difficultiesOptions = createOptions(difficulties);
export const languagesOptions = createOptions(languages);
export const questionsNumbersOptions = questionsNumbers.map(
    (questionNumber) => ({
        value: questionNumber,
        label: questionNumber.toString(),
    })
);

export const startExamDefaultValues = {
    topic: '',
    difficulty: 'easy',
    numQuestions: '10',
    language: 'english',
};
