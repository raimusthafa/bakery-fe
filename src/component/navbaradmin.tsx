import React, { useState, useEffect } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';
import LoginLogoutButton from './authbutton';

const NavbarAdmin: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-[#faecd9]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-[#6F4E37]">🍞 INI ADMIN</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-[#6F4E37] font-medium">
          <Link to="/dashboard" className="hover:underline underline-offset-4">Dashboard</Link>
          <Link to="/dashboard/products" className="hover:underline underline-offset-4">Produk</Link>
          <Link to="/dashboard/categories" className="hover:underline underline-offset-4">Categori</Link>
          <Link to="/dashboard/categories2" className="hover:underline underline-offset-4">Categori - 2</Link>
          <Link to="/stock/admin" className="hover:underline underline-offset-4">Stok</Link>
        </nav>
        <div className='hidden md:flex'>
        <LoginLogoutButton/>
        </div>


        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#6F4E37]" onClick={() => setDrawerOpen(true)}>
          <MenuOutlined style={{ fontSize: 22 }} />
        </button>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<CloseOutlined />}
      >
        <div className="flex flex-col space-y-4 text-[#6F4E37] font-medium">
          <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setDrawerOpen(false)}>Products</Link>
          <Link to="/features" onClick={() => setDrawerOpen(false)}>Features</Link>
          <Link to="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link>
          <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#6F4E37',
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
          <Button
          color="primary"
          variant="outlined"
          onClick={() => setDrawerOpen(false)}
          >
            Login
          </Button>
          </ConfigProvider>
        </div>
      </Drawer>
    </header>
  );
};

export default NavbarAdmin;
