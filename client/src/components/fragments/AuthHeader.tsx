import { AuthHeaderProps } from '@/types/global';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <CardHeader className='flex flex-col items-center'>
      <CardTitle className='text-2xl font-semibold tracking-tight'>
        {title}
      </CardTitle>
      <CardDescription className='text-center'>{subtitle}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
