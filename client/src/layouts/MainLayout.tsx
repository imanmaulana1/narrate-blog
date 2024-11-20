import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/containers/Sidebar';

const MainLayout = () => {
  return (
    <main className='container'>
      <div className='container grid grid-cols-1 px-0 lg:grid-cols-[75%_1fr]'>
        <div className='border-r-0 lg:border-r px-4 py-6'>
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default MainLayout;
