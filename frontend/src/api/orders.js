import client from './client';

export const ordersApi = {
  getAll: () => client.get('/orders/'),
  getById: (id) => client.get(`/orders/${id}/`),
  create: (data) => client.post('/orders/', data),
  delete: (id) => client.delete(`/orders/${id}/`),
};
