import Header from '@/components/containers/Header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <TooltipProvider>
        <Header />
        <Outlet />
      </TooltipProvider>
    </>
  );
};

export default RootLayout;
