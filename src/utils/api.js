import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Use production URL or Vite proxy
});

export const fetchCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    if (typeof data === 'string' && data.includes('<html')) throw new Error('API returned HTML');
    return data;
  } catch (error) {
    console.warn('Falling back to local CATEGORIES data:', error.message);
    const { CATEGORIES } = await import('../data/menuData.js');
    return CATEGORIES.filter(c => c.id !== 'all');
  }
};

export const fetchMenuItems = async (category = 'all') => {
  try {
    const url = category === 'all' ? '/menu' : `/menu?category=${category}`;
    const { data } = await api.get(url);
    if (typeof data === 'string' && data.includes('<html')) throw new Error('API returned HTML');
    return data;
  } catch (error) {
    console.warn('Falling back to local MENU_ITEMS data:', error.message);
    const { MENU_ITEMS } = await import('../data/menuData.js');
    return category === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === category);
  }
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
