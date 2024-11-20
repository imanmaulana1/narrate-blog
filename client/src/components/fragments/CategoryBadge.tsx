
import { Link } from 'react-router-dom';
import { badgeVariants } from '../ui/badge';
import { Category } from '@/types/api/category';

const CategoryBadge = ({category} : {category: Category}) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className={badgeVariants({
        variant: 'secondary',
        className: 'px-2 py-2',
      })}
    >
      {category.name}
    </Link>
  );
};

export default CategoryBadge;
