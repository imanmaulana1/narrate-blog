import AuthWrapper from '@/components/AuthWrapper';
import AuthLink from '@/components/AuthLink';
import LoginForm from '@/components/LoginForm';
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
