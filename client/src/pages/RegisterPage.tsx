import AuthWrapper from '@/components/containers/AuthWrapper';
import AuthLink from '@/components/fragments/AuthLink';
import RegisterForm from '@/components/fragments/RegisterForm';

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
