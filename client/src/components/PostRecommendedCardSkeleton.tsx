import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PostRecommendedCardSkeleton = () => (
  <Card className='border-none shadow-none mb-6'>
    <CardHeader className='p-0'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-6 w-6 rounded-full' />
        <Skeleton className='h-4 w-52' />
      </div>

      <Skeleton className='h-10 w-full mt-1' />
    </CardHeader>

    <CardFooter className='p-0 pt-2'>
      <Skeleton className='h-4 w-20' />
    </CardFooter>
  </Card>
);

export default PostRecommendedCardSkeleton;
