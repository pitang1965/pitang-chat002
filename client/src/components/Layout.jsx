import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  return (
    <div className='container flex flex-col w-auto h-screen mx-auto flex-nowrap'>
      <Header />
      <div className='h-screen bg-primary'>{children}</div>
      <Footer />
    </div>
  );
};
