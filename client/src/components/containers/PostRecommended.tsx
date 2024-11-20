import { useRecommendedPosts } from '@/hooks/use-post';

import { Link } from 'react-router-dom';
import PostRecommendedCard from '../fragments/PostRecommendedCard';
import PostRecommendedCardSkeleton from '../PostRecommendedCardSkeleton';

const PostRecommended = () => {
  const { data: post, isLoading } = useRecommendedPosts();

  return (
    <section>
      <h2>Staff Picks</h2>

      <div className='mt-4'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <PostRecommendedCardSkeleton key={index} />
          ))}

        {post?.data?.data.map((post) => (
          <Link to={`post/${post.slug}`} key={post.id}>
            <PostRecommendedCard post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostRecommended;
