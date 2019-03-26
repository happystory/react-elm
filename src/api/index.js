import axios from 'axios';

axios.defaults.baseURL = process.env.PUBLIC_URL;

const getGoods = () => axios.get('/api/goods.json');

const getSeller = () => axios.get('/api/seller.json');

const getRatings = () => axios.get('/api/ratings.json');

export default {
  getGoods,
  getSeller,
  getRatings
};
