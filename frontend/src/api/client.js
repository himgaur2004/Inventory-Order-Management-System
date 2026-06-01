import axios from 'axios';
import toast from 'react-hot-toast';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let detail = error.response?.data?.detail;
    let message = 'Something went wrong';
    if (detail) {
      if (typeof detail === 'string') {
        message = detail;
      } else if (Array.isArray(detail)) {
        // pydantic/fastapi returns a list of validation error objects sometimes
        message = detail
          .map((d) => (typeof d === 'string' ? d : d.msg || JSON.stringify(d)))
          .join('; ');
      } else if (typeof detail === 'object') {
        message = detail.message || detail.detail || JSON.stringify(detail);
      }
    }
    toast.error(String(message));
    return Promise.reject(error);
  }
);

export default client;
