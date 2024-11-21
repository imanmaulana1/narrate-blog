import DetailPostHeader from '@/components/containers/DetailPostHeader';
import PostCTA from '@/components/fragments/PostCTA';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useDetailPost } from '@/hooks/use-post';

import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postSlug } = useParams();

  const { data: post, isLoading } = useDetailPost(postSlug as string);

  return (
    <>
      {isLoading ? (
        <div className='container max-w-5xl h-[80vh] mx-auto grid place-items-center'>
          <div className='flex items-center justify-center space-x-4 mt-4'>
            <LoadingSpinner size={49} />
          </div>
        </div>
      ) : (
        <>
          <DetailPostHeader post={post} />
          <div className='container mb-4'>
            {post?.data.data.image && (
              <div className='relative overflow-hidden rounded-lg shadow-md max-w-4xl mx-auto aspect-w-16 aspect-h-9'>
                <img
                  src={post?.data.data.image}
                  alt='Content Image'
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
            )}
            <div className='max-w-3xl mx-auto mt-6'>
              <p>{post?.data.data.content}</p>
              <div className='flex items-center justify-center space-x-4 mt-4'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <span className='text-3xl text-primary/80' key={index}>
                    .
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='container max-w-5xl mx-auto'>
            <PostCTA post={post} />
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
