import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/api/posts';
import { useAuthUser } from '@/hooks/use-auth-user';
import { dateFormatted, dateFormattedFromNow } from '@/utils/helpers';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  Delete,
  Edit,
  Eye,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Timer,
} from 'lucide-react';

const PostCard = ({ post }: { post: Post }) => {
  const user = useAuthUser();

  return (
    <article className='border-b border-border/50 grid grid-cols-1  md:grid-cols-[65%_1fr]  overflow-hidden'>
      <Card className='border-none shadow-none bg-transparent'>
        <CardHeader className='pb-2'>
          <CardDescription className='mb-4'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-10 w-10 border-2 border-primary/20 ring-2 ring-primary/10'>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={`${post.author.username}'s avatar`}
                    className='object-cover'
                  />
                  <AvatarFallback className='bg-primary/10 text-primary'>
                    {post.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h3 className='text-foreground font-semibold'>
                    {user?.id === post.author.id
                      ? 'You'
                      : `By ${post.author.username}`}
                    <span className='text-muted-foreground text-sm ml-2 font-normal'>
                      ({dateFormattedFromNow(post.created_at)})
                    </span>
                  </h3>
                  <Link
                    to={`/category/${post.category.slug}`}
                    className={badgeVariants({
                      variant: 'secondary',
                      className:
                        'mt-1 w-[fit-content] hover:bg-secondary/80 transition-colors',
                    })}
                  >
                    {post.category.name}
                  </Link>
                </div>
              </div>
              <div className='ml-auto flex items-center text-muted-foreground gap-1'>
                <Eye size={16} className='text-primary/70' />
                <span className='text-xs font-medium'>{post.views} views</span>
              </div>
            </div>
          </CardDescription>
          <CardTitle className='mt-2'>
            <Link
              to={`/post/${post.slug}`}
              className='text-lg font-bold text-foreground transition-colors line-clamp-2'
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-2 pb-4'>
          <p className='text-muted-foreground line-clamp-3'>
            {post.short_content}
          </p>
        </CardContent>
        <CardFooter className='flex flex-col md:flex-row justify-between items-start  md:items-center border-t border-border/30 pt-3 pb-2'>
          <div className='flex items-center justify-between gap-3 text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Timer size={14} className='text-primary/70' />
              <span className='text-xs'>{dateFormatted(post.created_at)}</span>
            </div>

            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <MessageCircle size={14} className='text-primary/70' />
                <span className='text-xs'>{post._count?.comments || 0}</span>
              </div>

              <div className='flex items-center gap-1'>
                <Heart size={14} className='text-primary/70' />
                <span className='text-xs'>{post._count?.likes || 0}</span>
              </div>
            </div>
          </div>

          <div className='w-full md:w-auto flex items-center justify-between md:justify-start'>
            <div className='flex items-center gap-1'>
              <BookOpen size={14} className='text-primary/70' />
              <span className='text-xs text-primary/70'>
                {post.estimated_read_time}
              </span>
            </div>
            <div className='ml-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {user?.id === post.author.id && (
                    <>
                      <DropdownMenuItem>
                        <Edit size={14} className='mr-2' /> Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Delete size={14} className='mr-2' /> Delete Post
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem>
                    <Bookmark size={14} className='mr-2' /> Save Post
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 size={14} className='mr-2' /> Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardFooter>
      </Card>

      {post.image ? (
        <div className='hidden md:block w-full h-full p-4 group'>
          <img
            src={post.image}
            alt='Image of post'
            className='w-full h-[180px] object-cover rounded-lg 
         '
            loading='lazy'
          />
        </div>
      ) : (
        <div className='hidden md:block w-full h-full min-h-[200px] p-4'></div>
      )}
    </article>
  );
};

export default PostCard;
