import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, SquarePen, User } from 'lucide-react';
import { DropDownProps } from '@/types/global';

const AvatarDropdown = ({ currentUser, handleLogout }: DropDownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={currentUser?.avatar} alt='Profile Picture' />
          <AvatarFallback>
            {currentUser?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[250px] px-4 py-2'>
        <DropdownMenuLabel>
          <h3 className='font-semibold'>{currentUser?.username}</h3>
          <p className='text-xs text-muted-foreground'>{currentUser?.email}</p>
        </DropdownMenuLabel>
        <div className='block md:hidden'>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => navigate('/new-post')}
            className='cursor-pointer my-2 text-zinc-600 hover:text-black'
          >
            <div className='flex items-center gap-4'>
              <SquarePen size={20} />
              <p>Write a story</p>
            </div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => navigate(`@${currentUser?.username}`)}
          className='cursor-pointer my-2 text-zinc-600 hover:text-black'
        >
          <div className='flex items-center gap-4'>
            <User size={20} />
            <p>Profile</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => navigate('/settings')}
          className='cursor-pointer my-2 text-zinc-600 hover:text-black'
        >
          <div className='flex items-center gap-4'>
            <Settings size={20} />
            <p>Settings</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='mt-4' />
        <DropdownMenuItem
          onSelect={handleLogout}
          className='cursor-pointer text-zinc-600 hover:text-black'
        >
          <div className='flex items-center gap-4'>
            <LogOut size={20} />
            <p>Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
