import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.scss';

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

const getItemClasses = _score => {
  let result = [];
  let score = Math.floor(_score * 2) / 2;
  let hasDecimal = score % 1 !== 0;
  let integer = Math.floor(score);

  for (let i = 0; i < integer; i++) {
    result.push(CLS_ON);
  }
  if (hasDecimal) {
    result.push(CLS_HALF);
  }
  while (result.length < LENGTH) {
    result.push(CLS_OFF);
  }
  return result;
};

const Star = ({ size, score }) => {
  const itemClasses = getItemClasses(score);

  return (
    <div className={cx('star', `star-${size}`)}>
      {itemClasses.map((itemClass, index) => (
        <span className={cx('star-item', itemClass)} key={index} />
      ))}
    </div>
  );
};

Star.propTypes = {
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  score: PropTypes.number
};

Star.defaultProps = {
  size: 'middle',
  score: 0
};

export default Star;
