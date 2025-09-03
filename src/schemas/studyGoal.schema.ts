import moment from 'moment';
import z from 'zod';

export const studyGoalSchema = z.object({
    title: z
        .string({ required_error: 'Please enter your goal' })
        .min(1, 'Please enter your goal'),
    targetDate: z
        .date({ required_error: 'Please select a target date' })
        .transform((date) => moment(date).format('YYYY-MM-DD')),
});

export const studyTaskSchema = z.object({
    topic: z
        .string({ required_error: 'Please enter your topic' })
        .min(1, 'Please enter your topic'),
    priority: z.string(),
    deadline: z
        .date({ required_error: 'Please select a deadline' })
        .transform((date) => moment(date).format('YYYY-MM-DD')),
    days: z.array(z.string()).min(1, 'Please select minimum one day'),
    timeSlot: z
        .string({ required_error: 'Please enter your time slot' })
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: 'Time slot must be in HH:MM format',
        }),
});

export const generateStudyGoalSchema = z.object({
    prompt: z
        .string({ required_error: 'Please enter your instruction' })
        .min(5, 'Instruction is too short'),
});
