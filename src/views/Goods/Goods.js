import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BScroll from 'better-scroll';

import MyAPI from '../../api';
import { classMap } from '../../config/constants';
import Shopcart from '../../components/Shopcart/Shopcart';
import './style.scss';

const Goods = ({ seller }) => {
  const [goods, setGoods] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollYRef = useRef(0);
  const listHeightRef = useRef([]);
  const menuWrapperEl = useRef(null);
  const foodsWrapperRef = useRef(null);
  const menuScrollRef = useRef(null);
  const foodsScrolllRef = useRef(null);
  const scrollEventRef = useRef(null);

  const getCurrentIndex = () => {
    const listHeight = listHeightRef.current;
    const scrollY = scrollYRef.current;
    for (let i = 0; i < listHeight.length; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
      if (!height2 || (scrollY >= height1 && scrollY < height2)) {
        return i;
      }
    }
    return 0;
  };

  const initScroll = () => {
    menuScrollRef.current = new BScroll(menuWrapperEl.current, {
      click: true
    });
    foodsScrolllRef.current = new BScroll(foodsWrapperRef.current, {
      probeType: 3
    });

    scrollEventRef.current = pos => {
      scrollYRef.current = Math.abs(Math.round(pos.y));
      setCurrentIndex(getCurrentIndex());
    };

    foodsScrolllRef.current.on('scroll', scrollEventRef.current);
  };

  const calculateHeight = () => {
    const foodList = foodsWrapperRef.current.querySelectorAll('.food-list');
    let height = 0;
    let newListHeight = [];

    for (let i = 0; i < foodList.length; i++) {
      let item = foodList[i];
      newListHeight.push(height);
      height += item.clientHeight;
    }

    listHeightRef.current = newListHeight;
  };

  const selectMenu = index => {
    const foodList = foodsWrapperRef.current.querySelectorAll('.food-list');
    const el = foodList[index];
    foodsScrolllRef.current.scrollToElement(el, 300);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await MyAPI.getGoods();
      setGoods(data);
      initScroll();
      calculateHeight();
    }

    fetchData();

    return () => {
      foodsScrolllRef.current.off('scroll', scrollEventRef.current);
    };
  }, []);

  return (
    <div className='goods'>
      <div className='menu-wrapper' ref={menuWrapperEl}>
        <ul>
          {goods.map((item, index) => (
            <li
              onClick={() => {
                selectMenu(index);
              }}
              key={index}
              className={cx('menu-item', { current: currentIndex === index })}
            >
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
      <div className='foods-wrapper' ref={foodsWrapperRef}>
        <ul>
          {goods.map((item, index) => (
            <li className='food-list' key={index}>
              <h1 className='title'>{item.name}</h1>
              <ul>
                {item.foods.map((food, index) => (
                  <li className='food-item border-1px' key={index}>
                    <div className='icon'>
                      <img src={food.icon} alt='' />
                    </div>
                    <div className='content'>
                      <h2 className='name'>{food.name}</h2>
                      <p className='desc'>{food.description}</p>
                      <div className='extra'>
                        <span className='count'>月售{food.sellCount}</span>
                        <span>好评率{food.rating}%</span>
                      </div>
                      <div className='price'>
                        <span className='now'>￥{food.price}</span>
                        {food.oldPrice && (
                          <span className='old'>￥{food.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Shopcart deliveryPrice={seller.deliveryPrice} minPrice={seller.minPrice}/>
    </div>
  );
};

Goods.propTypes = {
  seller: PropTypes.object.isRequired
};

export default Goods;
