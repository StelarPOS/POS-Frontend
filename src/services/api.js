import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('API health check error:', error);
    throw error;
  }
};

export const testPaymentEndpoint = async () => {
  try {
    const response = await api.get('/payments/test');
    return response.data;
  } catch (error) {
    console.error('Payment test endpoint error:', error);
    throw error;
  }
};

export default api;
