import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const showSidebar = ['/dashboard', '/notifications', '/watchlist'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200">
      <Header />
      <div className="flex flex-grow pt-16">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow ${showSidebar ? 'md:ml-64' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;