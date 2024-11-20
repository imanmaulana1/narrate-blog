import { useCategories } from '@/hooks/use-category';
import CategoryBadge from '../fragments/CategoryBadge';

const CategoriesBadge = () => {
  const { data: categories } = useCategories();

  console.log(categories);
  return (
    <section>
      <h2>Recommended Topics</h2>

      <div className='mt-4 flex flex-wrap gap-2'>
        {categories?.data?.data.map((category) => (
         <CategoryBadge key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesBadge;
