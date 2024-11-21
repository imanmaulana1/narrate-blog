import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { badgeVariants } from '@/components/ui/badge';
import { dateFormatted } from '@/utils/helpers';
import { PostDetailResponse } from '@/types/api/posts';
import PostCTA from '../fragments/PostCTA';

type DetailPostHeaderProps = {
  post?: PostDetailResponse;
};

const DetailPostHeader = ({ post }: DetailPostHeaderProps) => {
  return (
    <header className='py-8'>
      <div className='container max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6 leading-tight"'>
          {post?.data.data.title}
        </h1>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='w-12 h-12 border-2 border-blue-50'>
              <AvatarImage
                src={post?.data.data.author.avatar}
                alt={`${post?.data.data.author.username}'s avatar`}
                className='object-cover rounded-full'
              />
              <AvatarFallback>
                {post?.data.data.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h3 className='text-lg font-semibold text-gray-800'>
                {post?.data.data.author.username}
              </h3>
              <p className='text-sm text-gray-500 flex items-center space-x-2'>
                <span>{post?.data.data.estimated_read_time}</span>
                <span>|</span>
                <span>{dateFormatted(post?.data.data.created_at)}</span>
              </p>
            </div>
          </div>

          <Link
            to={`/category/${post?.data.data.category.slug}`}
            className={badgeVariants({
              variant: 'secondary',
              className:
                'mt-1 w-[fit-content] hover:bg-secondary/80 transition-colors',
            })}
          >
            {post?.data.data.category.name}
          </Link>
        </div>
        <PostCTA post={post} />
      </div>
    </header>
  );
};

export default DetailPostHeader;
