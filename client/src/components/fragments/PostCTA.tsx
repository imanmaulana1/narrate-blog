import ToolTipComp from '@/components/fragments/ToolTipComp';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useToast } from '@/hooks/use-toast';
import { likePost } from '@/services/api/postService';
import { LikePostResponse, PostDetailResponse } from '@/types/api/posts';
import { ApiErrorResponse } from '@/types/global';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Bookmark,
  Delete,
  Edit,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from 'lucide-react';

type PostCTAProps = {
  post?: PostDetailResponse;
};

const PostCTA = ({ post }: PostCTAProps) => {
  const { user } = useAuthUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<
    LikePostResponse,
    ApiErrorResponse,
    { postId: string; postSlug: string }
  >({
    mutationFn: ({ postId }) => likePost(postId), // kirim postId ke fungsi likePost
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['detailPost', variables.postSlug],
      });
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error);
      toast({
        title: 'Oops!',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const hasLiked = post?.data.data.likes.some(
    (like) => like.user_id === user?.id
  );

  const handleLike = () => {
    if (post?.data.data.id && post?.data.data.slug) {
      mutation.mutate({
        postId: post.data.data.id, // Kirim postId untuk mutasi
        postSlug: post.data.data.slug, // Kirim postSlug untuk invalidasi query
      });
    }
  };
  return (
    <div className='flex justify-between items-center mt-6 border-t pt-2 border-gray-100'>
      <div className='flex items-center space-x-8'>
        <ToolTipComp
          trigger={
            <div className='flex items-center gap-1'>
              <Heart
                size={20}
                fill={hasLiked ? 'red' : 'none'}
                className={`${hasLiked && 'text-red-500'} text-primary/70`}
              />
              <span className='text-sm'>
                {post?.data.data._count?.likes || 0}
              </span>
            </div>
          }
          content={<p>Likes</p>}
          handleLike={handleLike}
        />
        <ToolTipComp
          trigger={
            <div className='flex items-center gap-1'>
              <MessageCircle size={20} className='text-primary/70' />
              <span className='text-sm'>
                {post?.data.data._count?.comments || 0}
              </span>
            </div>
          }
          content={<p>Comment</p>}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {user?.id === post?.data.data.author.id && (
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
  );
};

export default PostCTA;
