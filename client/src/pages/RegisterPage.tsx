import AuthWrapper from '@/components/AuthWrapper';
import AuthLink from '@/components/AuthLink';
import RegisterForm from '@/components/RegisterForm';

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
