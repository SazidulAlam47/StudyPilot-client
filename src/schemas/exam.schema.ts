import z from 'zod';

export const startExamSchema = z.object({
    topic: z.string().min(1, 'Please Enter you topic'),
    difficulty: z.string(),
    numQuestions: z.number(),
    language: z.string(),
});
