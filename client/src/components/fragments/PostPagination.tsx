import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PostPaginationProps } from '@/types/global';

const PostPagination = ({
  page,
  handlePageChange,
  posts,
}: PostPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        {posts?.data?.pagination?.totalPage &&
          posts.data.pagination.totalPage > 1 && (
            <PaginationItem>
              {page > 1 ? (
                <PaginationPrevious
                  onClick={(e) => handlePageChange(e, page - 1)}
                  className='cursor-pointer'
                />
              ) : (
                <PaginationPrevious className='cursor-not-allowed opacity-50' />
              )}
            </PaginationItem>
          )}

        {Array.from({
          length: posts?.data?.pagination?.totalPage || 1,
        }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href='#'
              onClick={(e) => {
                handlePageChange(e, index + 1);
              }}
              className={page === index + 1 ? 'font-bold text-black' : ''}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {posts?.data?.pagination?.totalPage &&
          posts.data.pagination.totalPage > 1 && (
            <PaginationItem>
              {posts?.data?.pagination?.has_more &&
              posts.data.pagination.has_more ? (
                <PaginationNext
                  onClick={(e) => handlePageChange(e, page + 1)}
                  className='cursor-pointer'
                />
              ) : (
                <PaginationNext className='cursor-not-allowed opacity-50' />
              )}
            </PaginationItem>
          )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;
