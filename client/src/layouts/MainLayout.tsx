import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main className='container'>
      <div className='container grid grid-cols-1  md:grid-cols-[70%_1fr]'>
        <div className='border-r px-4 py-6'>
          <Outlet />
        </div>
        <aside className='hidden md:block px-4 py-6'>Sidebar</aside>
      </div>
    </main>
  );
};

export default MainLayout;
