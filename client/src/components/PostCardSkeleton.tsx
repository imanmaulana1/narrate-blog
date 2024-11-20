import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <article className='border-b border-border/50 grid grid-cols-[65%_1fr] bg-background rounded-lg overflow-hidden'>
      <div className='p-4 space-y-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[150px]' />
              <Skeleton className='h-4 w-[100px]' />
            </div>
          </div>
          <Skeleton className='h-4 w-[60px]' />
        </div>

        <div className='space-y-2 mt-4'>
          <Skeleton className='h-4 w-[80%]' />

          <div className='space-y-2 mt-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[95%]' />
          </div>
        </div>

        <div className='flex justify-between items-center border-t border-border/30'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-3 w-[100px]' />
            <Skeleton className='h-3 w-[80px]' />
            <Skeleton className='h-3 w-[60px]' />
          </div>
          <Skeleton className='h-6 w-6 rounded-full' />
        </div>
      </div>

      <Skeleton className='w-full h-[180px] object-cover' />
    </article>
  );
};

export default PostCardSkeleton;
