import CarouselComp from '@/components/CarouselComp';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className='h-screen  flex p-1'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 bg-white'>
          <div className='hidden lg:block p-8 bg-[#f2f2f2] '>
            <div>Logo</div>
            <div className='flex flex-col items-center justify-center h-full'>
              <CarouselComp />
            </div>
          </div>
          <div className='py-2 md:p-8'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
