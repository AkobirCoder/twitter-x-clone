import * as z from 'zod';

export const registerStep1Schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long.'),
    email: z.string().email('Please enter a valid email address.'),
});

export const registerStep2Schema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});