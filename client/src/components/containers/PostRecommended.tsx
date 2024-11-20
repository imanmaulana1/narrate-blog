import { useRecommendedPosts } from '@/hooks/use-post';

import { Link } from 'react-router-dom';
import PostRecommendedCard from '../fragments/PostRecommendedCard';
import PostRecommendedCardSkeleton from '../PostRecommendedCardSkeleton';

const PostRecommended = () => {
  const { data: post, isLoading } = useRecommendedPosts();

  return (
    <div>
      <h2>Recommended Posts</h2>

      <div className='mt-4'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <PostRecommendedCardSkeleton key={i} />
          ))}

        {post?.data?.data.map((post) => (
          <Link to={`post/${post.slug}`}>
            <PostRecommendedCard key={post.id} post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostRecommended;
