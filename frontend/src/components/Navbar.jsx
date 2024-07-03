import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const items = [
    {
      key: '1',
      label: (
        <a  rel="noopener noreferrer" href="/login">
          Logout
        </a>
      ),
    },
   
  ];
  

  return (
    <div className='bg-yellow-200 flex justify-between sm:mx-3 items-center p-4'>
      <div>
        <img src='/logo.png' className='w-16 h-16' alt='logo' />
      </div>
      <div className='hidden md:flex justify-between gap-3'>
        <a href='/' className='p-2'>Home</a>
        <a href='/catalog' className='p-2'>Catalog</a>
        <a href='/store' className='p-2'>Our Store</a>
        <a href='/contact' className='p-2'>Contact</a>
        <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Avatar size={32} icon={<UserOutlined />} />
      </Dropdown>
      </div>
      <div className='md:hidden flex items-center'>
        <button onClick={toggleMenu} className='focus:outline-none'>
          <div className='space-y-2'>
            <div className='w-8 h-0.5 bg-black'></div>
            <div className='w-8 h-0.5 bg-black'></div>
            <div className='w-8 h-0.5 bg-black'></div>
          </div>
        </button>
      </div>
      {isOpen && (
        <div className='absolute top-16 left-0 w-full bg-yellow-200 flex flex-col items-center md:hidden'>
          <a href='/' className='p-2' onClick={toggleMenu}>Home</a>
          <a href='/catalog' className='p-2' onClick={toggleMenu}>Catalog</a>
          <a href='/store' className='p-2' onClick={toggleMenu}>Our Store</a>
          <a href='/contact' className='p-2' onClick={toggleMenu}>Contact</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
