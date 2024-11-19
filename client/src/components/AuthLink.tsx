import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { AuthLinkProps } from '@/types/global';
import { ChevronLeft } from 'lucide-react';

const AuthLink = ({ to, label }: AuthLinkProps) => {
  return (
    <div className='flex justify-between items-center'>
      <Link to={'/'} className={buttonVariants({ variant: 'ghost' })}>
        <span>
          <ChevronLeft />
        </span>{' '}
        Back to home
      </Link>
      <Link to={to} className={buttonVariants({ variant: 'ghost' })}>
        {label}
      </Link>
    </div>
  );
};

export default AuthLink;
