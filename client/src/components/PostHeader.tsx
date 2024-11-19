import { PostHeaderProps } from '@/types/global';
import { Button } from '@/components/ui/button';

const PostHeader = ({ order, sort, handleOrderChange }: PostHeaderProps) => {
  return (
    <header
      className='flex items-center gap-4 border-b w-[70%]'
      aria-label='Post Header'
    >
      <div
        className={`${
          order === 'desc' && sort === 'created_at' && 'border-b border-black'
        } pb-2`}
      >
        <Button
          variant={null}
          className={`font-normal ${
            order === 'desc' && sort === 'created_at'
              ? 'text-black'
              : 'text-muted-foreground'
          }  hover:text-black`}
          onClick={() => handleOrderChange('desc', 'created_at')}
        >
          Recent
        </Button>
      </div>
      <div
        className={`${
          order === 'asc' && sort === 'created_at' && 'border-b border-black'
        } pb-2`}
      >
        <Button
          variant={null}
          className={`font-normal ${
            order === 'asc' ? 'text-black' : 'text-muted-foreground'
          }  hover:text-black`}
          onClick={() => handleOrderChange('asc', 'created_at')}
        >
          Latest
        </Button>
      </div>
      <div
        className={`${
          order === 'desc' && sort === 'views' && 'border-b border-black'
        } pb-2`}
      >
        <Button
          variant={null}
          className={`font-normal ${
            order === 'desc' && sort === 'views'
              ? 'text-black'
              : 'text-muted-foreground'
          }  hover:text-black`}
          onClick={() => handleOrderChange('desc', 'views')}
        >
          Popular
        </Button>
      </div>
    </header>
  );
};

export default PostHeader;
