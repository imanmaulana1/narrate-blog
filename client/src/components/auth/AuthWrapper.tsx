import { Card, CardContent, CardFooter } from '../ui/card';

import { AuthWrapperProps } from '@/types/global';
import AuthHeader from './AuthHeader';

const AuthWrapper = ({ title, subtitle, children }: AuthWrapperProps) => {
  return (
    <Card className='relative h-full flex flex-col items-center justify-center border-none shadow-none'>
      <AuthHeader title={title} subtitle={subtitle} />
      <CardContent className='w-full max-w-[500px] mx-auto mb-6'>
        {children}
      </CardContent>
      <CardFooter className='absolute bottom-0'>
        <p className='text-sm text-muted-foreground '>
          &copy; {new Date().getFullYear()} Narrate. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
