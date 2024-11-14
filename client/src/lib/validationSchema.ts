import { z } from 'zod';

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .regex(/^[a-zA-Z0-9]{3,30}$/, {
        message:
          'Username can only contain letters and numbers and must be between 3 and 30 characters',
      }),
    email: z.string().min(1, 'Email is required').email({
      message: 'Please enter a valid email',
    }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
