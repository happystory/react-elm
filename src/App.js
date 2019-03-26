import React from 'react';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import Header from './components/Header/Header';
import Goods from './views/Goods/Goods';
import Ratings from './views/Ratings/Ratings';
import Seller from './views/Seller/Seller';
import './App.scss';

const App = () => {
  return (
    <Router>
      <Header />
      <div className='tab border-1px'>
        <div className='tab-item'>
          <NavLink to='/goods'>商品</NavLink>
        </div>
        <div className='tab-item'>
          <NavLink to='/ratings'>评论</NavLink>
        </div>
        <div className='tab-item'>
          <NavLink to='/seller'>商家</NavLink>
        </div>
      </div>
      <div className='content'>
        <Route exact path='/' render={() => <Redirect to='/goods' />} />
        <Route path='/goods' component={Goods} />
        <Route path='/ratings' component={Ratings} />
        <Route path='/seller' component={Seller} />
      </div>
    </Router>
  );
};

export default App;
