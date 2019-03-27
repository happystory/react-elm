import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.scss';

const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

const Header = ({ seller }) => {
  return (
    <div className='header'>
      <div className='content-wrapper'>
        <div className='avatar'>
          <img src={seller.avatar} alt='' />
        </div>
        <div className='content'>
          <div className='title'>
            <span className='brand' />
            <span className='name'>{seller.name}</span>
          </div>
          <div className='description'>
            {seller.description}/{seller.deliveryTime}分钟送达
          </div>
          {seller.supports && (
            <div className='support'>
              <span className={cx('icon', classMap[seller.supports[0].type])} />
              <span className='text'>{seller.supports[0].description}</span>
            </div>
          )}
        </div>
        {seller.supports && (
          <div className='support-count'>
            <span className='count'>{seller.supports.length}个</span>
            <i className='icon-keyboard_arrow_right' />
          </div>
        )}
      </div>
      <div className='bulletin-wrapper'>
          <span className="bulletin-title"></span>
          <span className="bulletin-text">{seller.bulletin}</span>
          <i className='icon-keyboard_arrow_right' />
      </div>
      <div className="background">
        <img src={seller.avatar} alt=""/>
      </div>
    </div>
  );
};

Header.propTypes = {
  seller: PropTypes.object
};

export default Header;
