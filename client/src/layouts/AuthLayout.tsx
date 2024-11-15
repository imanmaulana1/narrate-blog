import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className='h-screen overflow-hidden flex p-1'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 bg-white'>
          <div className='hidden lg:block p-8 bg-[#f2f2f2] '>
            <div>Logo</div>
            <div className='my-4 flex items-center justify-center min-h-screen'>
              <h1>Login</h1>
              <p>See your growth and get consulting growth</p>
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
