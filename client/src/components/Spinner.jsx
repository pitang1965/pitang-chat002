import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt='Loading...'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
      <p>無料枠Herokuが眠りから覚めるのをお待ちください...</p>
    </>
  );
};

export default Spinner;
