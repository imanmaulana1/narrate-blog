import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dateFormatted } from '@/utils/helpers';
import { Post } from '@/types/api/posts';

const PostRecommendedCard = ({ post }: { post: Post }) => {
  return (
    <Card key={post.id} className='border-none shadow-none mb-6'>
      <CardHeader className='p-0'>
        <CardDescription className='flex items-center gap-2'>
          <Avatar className='w-6 h-6'>
            <AvatarImage
              src={post.author.avatar}
              alt={`${post.author.username}'s avatar`}
            />
            <AvatarFallback className='bg-primary/10 text-primary'>
              {post.author.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>
            In <span className='text-primary'>{post.category.name} </span>
            by{' '}
            <span className='text-primary'>
              {post.author.name ? post.author.name : 'User'}
            </span>
          </p>
        </CardDescription>
        <CardTitle className='py-1'>{post.title}</CardTitle>
      </CardHeader>
      <CardFooter className='p-0 pt-1 text-sm text-primary/70'>
        {dateFormatted(post.created_at)}
      </CardFooter>
    </Card>
  );
};

export default PostRecommendedCard;
