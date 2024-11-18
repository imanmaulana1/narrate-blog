import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from '@/hooks/use-auth-user';
import isAuthenticated from '@/lib/privateRouteHandler';
import DropdownComp from './DropdownComp';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';

const Navbar = () => {
  const currentUser = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <nav
      className='container flex items-center justify-between'
      aria-label='Main Navigation'
    >
      <div className='flex items-center gap-6'>
        <Link to={'/'}>
          <h1 className='text-2xl font-bold'>Narrate</h1>
        </Link>
        <div className='relative hidden md:block'>
          <Label htmlFor='search' className='sr-only'>
            Search
          </Label>
          <Input
            id='search'
            type='search'
            placeholder='Search'
            className='hidden md:block rounded-xl ps-9'
          />
          <Search
            size={16}
            className='absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground'
          />
        </div>
      </div>
      <div className='flex items-center gap-6'>
        <Link
          to={'/search'}
          className='block md:hidden text-muted-foreground hover:text-black'
        >
          <Search />
        </Link>

        {isAuthenticated() ? (
          <>
            <div className='hidden md:block'>
              <Link
                to={'/new-post'}
                className={`${buttonVariants({
                  variant: 'outline',
                })} text-[#717171] hover:text-[#2a2a2a]`}
              >
                Write a Story
              </Link>
            </div>
            <DropdownComp
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <Button>
            <Link to='/login'>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
