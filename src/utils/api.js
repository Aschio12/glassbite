import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Using Vite proxy
});

export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

export const fetchMenuItems = async (category = 'all') => {
  const url = category === 'all' ? '/menu' : `/menu?category=${category}`;
  const { data } = await api.get(url);
  return data;
};

export const createPaymentIntent = async (items) => {
  const { data } = await api.post('/orders/create-payment-intent', { items });
  return data;
};

export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

export default api;
