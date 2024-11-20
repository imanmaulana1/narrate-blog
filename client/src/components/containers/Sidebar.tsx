import CategoriesBadge from './CategoriesBadge';
import PostRecommended from './PostRecommended';

const Sidebar = () => {
  return (
    <aside className='hidden lg:block px-4 py-6'>
      <div className='flex flex-col gap-4'>
        <PostRecommended />
        <CategoriesBadge />
      </div>
    </aside>
  );
};

export default Sidebar;
