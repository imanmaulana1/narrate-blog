import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/lib/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/api/authService';
import { AxiosResponse } from 'axios';
import { ApiErrorResponse, RegisterResponse } from '@/types/global';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
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

  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    ApiErrorResponse,
    z.infer<typeof RegisterSchema>
  >({
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      RegisterSchema.parse(data);

      return await register(data);
    },
    onSuccess: (data) => {
      console.log(data);
      
      toast({
        title: 'Success! Your account has been created successfully.',
        description: 'Youll be redirected to the login page.',
        variant: 'success',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    },
    onError: (error: ApiErrorResponse) => {
      console.error('Error during registration:', error);

      if (error.errors && error.errors.length > 0) {
        toast({
          title: 'Invalid Input',
          description: error.errors[0].message,
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

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    mutation.mutate(data as z.infer<typeof RegisterSchema>);
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
