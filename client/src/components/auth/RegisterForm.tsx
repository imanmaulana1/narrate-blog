import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/lib/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/api/authService';
import { RegisterResponse } from '@/types/api/users/user';
import { ApiErrorResponse } from '@/types/global';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

type User = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const form = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const mutation = useMutation<RegisterResponse, ApiErrorResponse, User>({
    mutationFn: (data: User) => {
      RegisterSchema.parse(data);

      return register(data);
    },
    onSuccess: (data) => {
      console.log(data);

      toast({
        title: 'Success! Your account has been created successfully.',
        description: 'Youll be redirected to the login page.',
        variant: 'success',
        duration: import.meta.env.VITE_DELAY_DURATION || 3000,
      });

      setTimeout(() => {
        navigate('/login');
      }, import.meta.env.VITE_DELAY_DURATION || 3000);
    },
    onError: (error: ApiErrorResponse) => {
      console.error('Error during registration:', error);

      if (error.errors && error.errors.length > 0) {
        toast({
          title: 'Invalid Email',
          description:
            'Please enter a valid email address ending in .com or .net. Other domains aren’t supported at this time. Thank you!',
          variant: 'destructive',
        });
      } else {
        toast({
          title: error.message,
          description: `It looks like this email or username is already in use. Please try a different one.`,
          variant: 'destructive',
        });
      }
    },
  });

  const onSubmit = (data: User) => {
    mutation.mutate(data as User);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <FormField
            name='username'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='Enter your username (e.g., johndoe23)'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Enter your email (e.g., john.doe@example.com)'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='Enter your password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='Re-enter your password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' size={'lg'} className='w-full'>
          {mutation.isPending ? <LoadingSpinner /> : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
