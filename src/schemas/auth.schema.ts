import { z } from 'zod';

const newPasswordSchema = z
    .string({ message: 'Please enter your New Password' })
    .min(6, 'Password must be at least 6 characters long')
    .refine(
        (password) => /[a-zA-Z]/.test(password),
        'Password must contain at least one letter'
    )
    .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter'
    )
    .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter'
    )
    .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number'
    )
    .refine(
        (password) => /[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/.test(password),
        'Password must contain at least one special character'
    );

export const loginSchema = z.object({
    email: z.email('Invalid Email'),
    password: z
        .string({ message: 'Please enter your Password' })
        .min(1, 'Please enter your Password'),
});

export const registerSchema = z.object({
    name: z
        .string({ message: 'Please enter your Name' })
        .min(1, 'Please enter your Name'),
    email: z.email('Invalid Email'),
    password: newPasswordSchema,
    file: z.any(),
});

export const changePasswordSchema = z.object({
    oldPassword: z
        .string({ message: 'Please enter your Old Password' })
        .min(1, 'Please enter your Old Password'),
    newPassword: newPasswordSchema,
});

export const forgotPasswordSchema = z.object({
    email: z.email('Invalid Email'),
});

export const resetPasswordSchema = z
    .object({
        password: newPasswordSchema,
        confirmPassword: z
            .string({ message: 'Please enter confirm Password' })
            .min(1, 'Please enter confirm Password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not matched',
        path: ['confirmPassword'],
    });
