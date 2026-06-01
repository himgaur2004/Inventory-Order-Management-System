import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/orders';
import toast from 'react-hot-toast';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getAll,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Order created successfully');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to create order';
      toast.error(errorMessage);
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Order cancelled');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to cancel order';
      toast.error(errorMessage);
    },
  });
}
