import AuthWrapper from '@/components/auth/AuthWrapper';
import AuthLink from '@/components/auth/AuthLink';
import LoginForm from '@/components/auth/LoginForm';
const LoginPage = () => {
  return (
    <>
      <AuthLink to='/register' label='Register' />
      <AuthWrapper title='Welcome Back!' subtitle='Please login to continue.'>
        <LoginForm />
      </AuthWrapper>
    </>
  );
};

export default LoginPage;
