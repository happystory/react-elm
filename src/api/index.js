import axios from 'axios';

axios.defaults.baseURL = process.env.PUBLIC_URL;

export const getGoods = () => axios.get('/api/goods');

export const getSeller = () => axios.get('/api/seller');

export const getRatings = () => axios.get('/api/ratings');
