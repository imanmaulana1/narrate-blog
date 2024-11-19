import { Post } from '@/types/api/posts';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>Date:{post.created_at}</p>
      <p>
        <span>
          View: {post.views} Likes: {post._count.likes}
        </span>
      </p>
    </article>
  );
};

export default PostCard;
