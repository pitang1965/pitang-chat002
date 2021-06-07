import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  return (
    <div
      className='container grid w-full h-screen mx-auto overscroll-none'
      style={{ gridTemplateRows: 'auto 1fr auto' }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};
