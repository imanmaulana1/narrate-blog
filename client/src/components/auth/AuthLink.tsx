import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import { AuthLinkProps } from '@/types/global';

const AuthLink = ({ to, label }: AuthLinkProps) => {
  return (
    <div className='flex justify-end'>
      <Link to={to} className={buttonVariants({ variant: 'ghost' })}>
        {label}
      </Link>
    </div>
  );
};

export default AuthLink;
