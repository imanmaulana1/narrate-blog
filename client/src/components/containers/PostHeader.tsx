import { PostHeaderProps } from '@/types/global';
import SortButton from '@/components/fragments/SortButton';

const PostHeader = ({ order, sort, handleOrderChange }: PostHeaderProps) => {
  const sortButtons = [
    {
      label: 'Recent',
      isActive: order === 'desc' && sort === 'created_at',
      onClick: () => handleOrderChange('desc', 'created_at'),
    },
    {
      label: 'Latest',
      isActive: order === 'asc' && sort === 'created_at',
      onClick: () => handleOrderChange('asc', 'created_at'),
    },
    {
      label: 'Popular',
      isActive: order === 'desc' && sort === 'views',
      onClick: () => handleOrderChange('desc', 'views'),
    },
  ];
  return (
    <header
      className='flex items-center gap-4 border-b w-[70%]'
      aria-label='Post Header'
    >
      {sortButtons.map((button) => (
        <SortButton key={button.label} {...button} />
      ))}
    </header>
  );
};

export default PostHeader;
