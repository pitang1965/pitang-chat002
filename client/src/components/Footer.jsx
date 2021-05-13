import React from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='p-4 bg-purple-200'>
      <div className='flex flex-wrap pt-2 pb-2 text-center lg:flex-row-reverse lg:justify-between'>
        <ul className='w-full lg:w-auto'>
          <FooterIconLink
            href={'https://twitter.com/pitang1965'}
            icon={FaTwitter}
            label='Twitter'
          />
          <FooterIconLink
            href={'https://www.instagram.com/pitang1965/'}
            icon={FaInstagram}
            label='Instagram'
          />
        </ul>
        <div className='w-full pt-6 text-sm text-blue-800 lg:w-auto lg:pt-0'>
          &copy; 2020 All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterIconLink = ({ href, label, icon: Icon }) => {
  const linkParams = { href };

  if (href.startsWith('http')) {
    linkParams.target = '_blank';
    linkParams.rel = 'noreferrer noopener';
  }

  return (
    <li className='inline-block px-2'>
      <a
        {...linkParams}
        className='inline-flex items-center justify-center w-8 h-8 text-blue-800 transition-colors duration-200 border border-blue-800 rounded-full hover:text-white hover:bg-blue-400 hover:border-blue-400'
      >
        <span className='sr-only'>{label}</span>
        <Icon className="w-3 h-3 fill-current" />
      </a>
    </li>
  );
};
