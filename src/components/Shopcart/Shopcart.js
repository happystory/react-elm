import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.scss';

const Shopcard = React.memo(({ selectFoods, deliveryPrice, minPrice }) => {
  console.log(selectFoods, deliveryPrice, minPrice)
  const totalPrice = selectFoods.reduce((s, a) => (s += a.price * a.count), 0);
  const totalCount = selectFoods.reduce((s, a) => (s += a.count), 0);
  const payDesc =
    totalPrice === 0
      ? `￥${minPrice}元起送`
      : totalPrice < minPrice
      ? `还差￥${minPrice - totalPrice}元起送`
      : '去结算';

  return (
    <div className='shopcart'>
      <div className='content'>
        <div className='content-left'>
          <div className='logo-wrapper'>
            <div className={cx('logo', { highlight: totalCount > 0 })}>
              <i className='icon-shopping_cart' />
            </div>
            <div
              style={{ display: totalCount > 0 ? '' : 'none' }}
              className='num'
            >
              {totalCount}
            </div>
          </div>
          <div className={cx('price', { highlight: totalCount > 0 })}>
            ￥{totalPrice}
          </div>
          <div className='desc'>另需配送费￥{deliveryPrice}元</div>
        </div>
        <div className='content-right'>
          <div className={cx('pay', totalPrice < minPrice ? 'not-enough' : 'enough')}>{payDesc}</div>
        </div>
      </div>
    </div>
  );
});

Shopcard.propTypes = {
  selectFoods: PropTypes.array,
  deliveryPrice: PropTypes.number,
  minPrice: PropTypes.number
};

Shopcard.defaultProps = {
  selectFoods: [
    {
      price: 10,
      count: 0
    }
  ],
  deliveryPrice: 0,
  minPrice: 0
};

export default Shopcard;
