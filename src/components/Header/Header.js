import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ seller }) => {
  console.log(seller);

  return <div className='header'>我是header</div>;
};

Header.propTypes = {
  seller: PropTypes.object
};

export default Header;
