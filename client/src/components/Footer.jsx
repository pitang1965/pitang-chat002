import React from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='sticky flex flex-wrap flex-shrink-0 h-20 text-center bg-purple-200 opacity-70 flex-grow-1 lg:flex-row-reverse lg:justify-between lg:h-12'>
      <ul className='self-center w-full p-0 mb-0 lg:w-auto lg:my-0 lg:mr-2'>
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
      <div className='self-center w-full pb-0 my-2 text-sm text-blue-800 lg:w-auto lg:p-0 lg:my-0 lg:ml-2'>
        &copy; 2020 All rights reserved.
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
        className='inline-flex items-center justify-center w-8 h-8 mt-2 mb-0 no-underline text-blue-800 border border-blue-800 border-solid rounded-full lg:mt-0 hover:text-white hover:bg-blue-400 hover:border-blue-400'
      >
        <span className='sr-only'>{label}</span>
        <Icon className='w-3 h-3 fill-current' />
      </a>
    </li>
  );
};
