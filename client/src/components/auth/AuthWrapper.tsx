import { Card, CardContent, CardFooter } from '../ui/card';

import { AuthWrapperProps } from '@/types/global';
import AuthHeader from './AuthHeader';

const AuthWrapper = ({ title, subtitle, children }: AuthWrapperProps) => {
  return (
    <Card className='min-h-screen flex flex-col items-center justify-center border-none shadow-none'>
      <AuthHeader title={title} subtitle={subtitle} />
      <CardContent className='w-full max-w-[500px] mx-auto'>{children}</CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
