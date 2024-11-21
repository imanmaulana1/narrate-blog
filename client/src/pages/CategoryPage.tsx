import CategoryHeader from '@/components/fragments/CategoryHeader';
import PostCard from '@/components/fragments/PostCard';
import PostCardSkeleton from '@/components/PostCardSkeleton';
import { useAuthUser } from '@/hooks/use-auth-user';
import { useCategory } from '@/hooks/use-category';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categorySlug } = useParams();

  const { data: category, isLoading } = useCategory(categorySlug as string);

  const { user } = useAuthUser();

  const categoryPosts = category?.data?.data?.posts || [];

  return (
    <section>
      <CategoryHeader category={category} />

      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}

      {categoryPosts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </section>
  );
};

export default CategoryPage;
