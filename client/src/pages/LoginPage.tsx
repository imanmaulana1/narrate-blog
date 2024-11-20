import AuthWrapper from '@/components/containers/AuthWrapper';
import AuthLink from '@/components/fragments/AuthLink';
import LoginForm from '@/components/fragments/LoginForm';
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
