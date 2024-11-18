import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { LoginSchema } from '@/lib/validationSchema';
import { login } from '@/services/api/authService';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '@/types/api/users/user';
import { ApiErrorResponse } from '@/types/global';
import { Eye, EyeOff } from 'lucide-react';
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

type User = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      credential: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const mutation = useMutation<LoginResponse, ApiErrorResponse, User>({
    mutationFn: (data: User) => {
      LoginSchema.parse(data);

      return login(data);
    },
    onSuccess: (data) => {
      const { token } = data.data;

      localStorage.setItem('authToken', token.access_token);

      toast({
        title: 'Success! You have logged in successfully.',
        description: 'Youll be redirected to the home page.',
        variant: 'success',
        duration: import.meta.env.VITE_DELAY_DURATION || 3000,
      });

      setTimeout(() => {
        navigate('/');
      }, import.meta.env.VITE_DELAY_DURATION || 3000);
    },
    onError: (error: ApiErrorResponse) => {
      console.error('Error during login:', error);

      if (error.errors && error.errors.length > 0) {
        toast({
          title: 'Invalid Input',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        if (
          error.message ===
          "We couldn't find an account with that email/username. Please check your entry and try again"
        ) {
          toast({
            title: 'Account Not Found',
            description: error.message,
            variant: 'destructive',
          });
        } else if (
          error.message ===
          'The password you entered is incorrect. Please double-check and try again'
        ) {
          toast({
            title: 'Incorrect Password',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          console.error('Error during registration:', error);
          toast({
            title: 'Oops! Something went wrong',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    },
  });

  const onSubmit = (data: User) => {
    mutation.mutate(data as User);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              name='credential'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your username or email'
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
                    <div className='relative'>
                      <Input
                        {...field}
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder='Enter your password'
                        autoComplete='off'
                      />
                      <span
                        className='absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground hover:text-foreground active:text-slate-400 '
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                          setPasswordVisibility((prevState) => !prevState)
                        }
                        aria-label={
                          passwordVisibility ? 'Hide password' : 'Show password'
                        }
                      >
                        {passwordVisibility ? <Eye /> : <EyeOff />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' size={'lg'} className='w-full'>
            {mutation.isPending ? <LoadingSpinner /> : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
