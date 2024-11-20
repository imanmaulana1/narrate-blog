import { useState } from 'react';
import { usePosts } from '@/hooks/use-post';
import PostHeader from '@/components/containers/PostHeader';
import PostCard from '@/components/fragments/PostCard';
import PostPagination from '@/components/fragments/PostPagination';
import PostCardSkeleton from '@/components/PostCardSkeleton';

const HomePage = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [sort, setSort] = useState<'created_at' | 'views'>('created_at');
  const [page, setPage] = useState(1);

  const { data: posts, isLoading } = usePosts(page, sort, order);

  const handleOrderChange = (
    newOrder: 'asc' | 'desc',
    newSort: 'created_at' | 'views'
  ) => {
    setOrder(newOrder);
    setSort(newSort);
  };

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    newPage: number
  ) => {
    e.preventDefault();
    setPage(newPage);
  };

  return (
    <section>
      <PostHeader
        order={order}
        sort={sort}
        handleOrderChange={handleOrderChange}
      />

      <div className='flex flex-col gap-8 my-8'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)}

        {posts?.data?.data?.map((post) => (
          
            <PostCard key={post.id} post={post} />
         
        ))}
      </div>

      <PostPagination
        page={page}
        handlePageChange={handlePageChange}
        posts={posts}
      />
    </section>
  );
};

export default HomePage;
