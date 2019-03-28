import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BScroll from 'better-scroll';

import MyAPI from '../../api';
import { classMap } from '../../config/constants';
import './style.scss';

const Goods = ({ seller }) => {
  const [goods, setGoods] = useState([]);
  const menuWrapperEl = useRef(null);
  const foodsWrapper = useRef(null);

  const initScroll = () => {
    console.log(menuWrapperEl.current)
    console.log(foodsWrapper.current)
    const menuScroll = new BScroll(menuWrapperEl.current, {})
    const foodsScroll = new BScroll(foodsWrapper.current, {})
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await MyAPI.getGoods();
      setGoods(data);
      // console.log(data);
      initScroll()
      
    }

    fetchData();
  }, []);

  return (
    <div className='goods'>
      <div className='menu-wrapper' ref={menuWrapperEl}>
        <ul>
          {goods.map((item, index) => (
            <li key={index} className='menu-item'>
              <span className='text border-1px'>
                {item.type > 0 && (
                  <span className={cx('icon', classMap[item.type])} />
                )}
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='foods-wrapper' ref={foodsWrapper}>
        <ul>
          {goods.map((item,index) => (
            <li className="food-list" key={index}>
              <h1 className="title">
                {item.name}
              </h1>
              <ul>
                {
                  item.foods.map((food, index) => (
                    <li className="food-item border-1px" key={index}>
                      <div className="icon">
                        <img src={food.icon} alt=""/>
                      </div>
                      <div className="content">
                        <h2 className="name">{food.name}</h2>
                        <p className="desc">{food.description}</p>
                        <div className="extra">
                          <span className="count">月售{food.sellCount}</span>
                          <span>好评率{food.rating}%</span>
                        </div>
                        <div className="price">
                          <span className="now">￥{food.price}</span>
                          {
                            food.oldPrice && <span className="old">￥{food.oldPrice}</span>
                          }
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Goods.propTypes = {
  seller: PropTypes.object
};

export default Goods;
