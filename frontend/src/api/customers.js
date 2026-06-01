import client from './client';

export const customersApi = {
  getAll: () => client.get('/customers/'),
  getById: (id) => client.get(`/customers/${id}/`),
  create: (data) => client.post('/customers/', data),
  update: (id, data) => client.put(`/customers/${id}/`, data),
  delete: (id) => client.delete(`/customers/${id}/`),
};
