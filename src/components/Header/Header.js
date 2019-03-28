import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Star from '../Star/Star';
import { classMap } from '../../config/constants';
import './style.scss';

const Header = ({ seller }) => {
  const [detailShow, setDetailShow] = useState(false);

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
          <div
            className='support-count'
            onClick={() => {
              setDetailShow(true);
            }}
          >
            <span className='count'>{seller.supports.length}个</span>
            <i className='icon-keyboard_arrow_right' />
          </div>
        )}
      </div>
      <div
        className='bulletin-wrapper'
        onClick={() => {
          setDetailShow(true);
        }}
      >
        <span className='bulletin-title' />
        <span className='bulletin-text'>{seller.bulletin}</span>
        <i className='icon-keyboard_arrow_right' />
      </div>
      <div className='background'>
        <img src={seller.avatar} alt='' />
      </div>

      <CSSTransition
        in={detailShow}
        unmountOnExit
        classNames='fade'
        timeout={500}
      >
        <div className='detail'>
          <div className='detail-wrapper'>
            <h1 className='name'>{seller.name}</h1>
            <div className='star-wrapper'>
              <Star size='large' score={seller.score} />
            </div>
            <div className='title'>
              <div className='line' />
              <div className='text'>优惠信息</div>
              <div className='line' />
            </div>
            {seller.supports && (
              <ul className='supports'>
                {seller.supports.map((item, index) => (
                  <li className='support-item' key={index}>
                    <span
                      className={cx(
                        'icon',
                        classMap[seller.supports[index].type]
                      )}
                    />
                    <span className='text'>
                      {seller.supports[index].description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className='title'>
              <div className='line' />
              <div className='text'>商家公告</div>
              <div className='line' />
            </div>
            <div className='bulletin'>
              <div className='content'>{seller.bulletin}</div>
            </div>
          </div>
          <div
            className='detail-close'
            onClick={() => {
              setDetailShow(false);
            }}
          >
            <i className='icon-close' />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

Header.propTypes = {
  seller: PropTypes.object
};

export default Header;
