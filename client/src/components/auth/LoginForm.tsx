import { useToast } from '@/hooks/use-toast';
import { LoginSchema } from '@/lib/validationSchema';
import { login } from '@/services/api/authService';
import { ApiErrorResponse, LoginResponse } from '@/types/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
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

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      credential: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const mutation = useMutation<
    AxiosResponse<LoginResponse>,
    ApiErrorResponse,
    z.infer<typeof LoginSchema>
  >({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      LoginSchema.parse(data);

      return await login(data);
    },
    onSuccess: (data) => {
      console.log(data.data);

      localStorage.setItem('authToken', data.data.token.access_token);

      toast({
        title: 'Success! You have logged in successfully.',
        description: 'Youll be redirected to the home page.',
        variant: 'success',
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);
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
        }
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutation.mutate(data as z.infer<typeof LoginSchema>);
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
