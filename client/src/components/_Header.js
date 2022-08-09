import React from 'react';

const Header = (props) => {

  return (
    <>
      <h1 className='mb-1 text-left'>
        { props.text }
      </h1>
    </>
  );
}

export default Header;
