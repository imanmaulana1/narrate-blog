import { useState } from 'react';
import { usePosts } from '@/hooks/use-post';
import PostHeader from '@/components/PostHeader';
import PostCard from '@/components/PostCard';
import PostPagination from '@/components/PostPagination';

const HomePage = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [sort, setSort] = useState<'created_at' | 'views'>('created_at');
  const [page, setPage] = useState(1);

  const { data: posts } = usePosts(page, sort, order);

  console.log(posts?.data);

  console.log(posts?.data.pagination.totalPage);
  console.log(posts?.data.pagination.currentPage);

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
