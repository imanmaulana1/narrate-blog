import AuthWrapper from '@/components/auth/AuthWrapper';
import AuthLink from '@/components/auth/AuthLink';
import LoginForm from '@/components/auth/LoginForm';
const LoginPage = () => {
  return (
    <>
      <AuthLink to='/register' label='Register' />
      <AuthWrapper
        title='Welcome Back to Narrate'
        subtitle='Enter your username or email and password to continue.'
      >
        <LoginForm />
      </AuthWrapper>
    </>
  );
};

export default LoginPage;
