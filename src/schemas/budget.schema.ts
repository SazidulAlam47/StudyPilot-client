import moment from 'moment';
import z from 'zod';

export const transactionSchema = z.object({
    date: z.date().transform((date) => moment(date).format('YYYY-MM-DD')),
    description: z.string().min(1, 'Please enter description'),
    amount: z
        .string()
        .min(1, 'Please enter amount')
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num), {
            message: 'Amount must be a valid number',
        })
        .refine((num) => num >= 0, {
            message: 'Amount must be positive',
        }),
    tnxType: z.string(),
});
