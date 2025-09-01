import moment from 'moment';
import z from 'zod';

export const createStudyGoalSchema = z.object({
    title: z.string().min(1, 'Please enter your goal'),
    targetDate: z.date().transform((date) => moment(date).format('YYYY-MM-DD')),
});
