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

export const createPayPalOrder = async (total_amount) => {
  const { data } = await api.post('/orders/create-paypal-order', { total_amount });
  return data;
};

export const capturePayPalOrder = async (orderData) => {
  const { data } = await api.post('/orders/capture-paypal-order', orderData);
  return data;
};

export default api;
