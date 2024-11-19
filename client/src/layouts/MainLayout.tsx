import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className='container'>
      <div className='container grid grid-cols-1 px-0 lg:grid-cols-[80%_1fr]'>
        <div className='border-r-0 lg:border-r px-4 py-6'>
          <Outlet />
        </div>
        <aside className='hidden lg:block px-4 py-6'>Sidebar</aside>
      </div>
    </main>
  );
};

export default MainLayout;
