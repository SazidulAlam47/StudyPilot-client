import z from 'zod';

export const startExamSchema = z.object({
    topic: z.string().min(1, 'Please enter quiz topic'),
    difficulty: z.string(),
    numQuestions: z.string().transform((val) => Number(val)),
    language: z.string(),
});
