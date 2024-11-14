import AuthWrapper from '@/components/auth/AuthWrapper';
import AuthLink from '@/components/auth/AuthLink';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <AuthLink to='/login' label='Login' />
      <AuthWrapper
        title='Create an account'
        subtitle='Enter your details below to get started with your new account.'
      >
        <RegisterForm />
      </AuthWrapper>
    </>
  );
};

export default RegisterPage;
