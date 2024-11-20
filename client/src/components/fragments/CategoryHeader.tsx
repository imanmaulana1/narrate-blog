import { CategoryDetailResponse } from '@/types/api/category';
import { Book } from 'lucide-react';

type CategoryHeaderProps = {
  category?: CategoryDetailResponse | undefined;
};
const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  if (!category) return null;

  return (
    <div className='bg-gradient-to-r from-blue-50 to-blue-100 py-4 px-2 md:p-6 rounded-lg shadow-md mb-4'>
      <div className='max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
        <div className='bg-blue-500 text-white p-4 rounded-full shadow-lg'>
          <Book className='w-8 h-8 md:w-8 md:h-8' />
        </div>

        <div className='text-center md:text-left flex-1'>
          <h1 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>
            {category.data.data.name}
          </h1>
          <p className='text-gray-600 text-md mb-4'>
            Explore posts in this category
          </p>

          <div className='flex justify-center md:justify-start space-x-4 text-gray-700'>
            <div className='flex items-center space-x-2'>
              <Book className='w-5 h-5 text-blue-500' />
              <span>{category.data.data.posts?.length} Posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
