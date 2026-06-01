import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import DataTable from '../components/tables/DataTable';
import Badge from '../components/ui/Badge';
import OrderModal from '../components/forms/OrderModal';
import OrderDetailModal from '../components/forms/OrderDetailModal';
import { useOrders, useDeleteOrder } from '../hooks/useOrders';

export default function Orders() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders = [], isLoading } = useOrders();
  const deleteOrder = useDeleteOrder();

  const getStatusBadge = (order) => {
    const itemCount = order.items?.length ?? 0;
    if (itemCount === 0) return <Badge label='Empty' color='gray' dot />;
    return <Badge label={`${itemCount} item${itemCount !== 1 ? 's' : ''}`} color='blue' dot />;
  };

  const columns = [
    { key: 'id', label: 'Order ID', render: (row) => <span className='font-mono font-semibold text-brand-600'>#{row.id}</span> },
    { key: 'customer', label: 'Customer', render: (row) => (
        <div>
          <p className='font-medium text-gray-900'>{row.customer?.name}</p>
          <p className='text-xs text-gray-500'>{row.customer?.email}</p>
        </div>
      )
    },
    { key: 'items', label: 'Items', render: (row) => getStatusBadge(row) },
    { key: 'total_amount', label: 'Total', render: (row) => (
        <span className='font-semibold text-gray-900'>${Number(row.total_amount).toFixed(2)}</span>
      )
    },
    { key: 'created_at', label: 'Date', render: (row) => (
        <span className='text-gray-600'>{new Date(row.created_at).toLocaleDateString()}</span>
      )
    },
    {
      key: 'actions', label: '',
      render: (row) => (
        <div className='flex gap-2 justify-end'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setSelectedOrder(row)}
            title='View order details'
          >
            <Eye size={14} /> View
          </Button>
          <Button
            variant='danger'
            size='sm'
            onClick={() => deleteOrder.mutate(row.id)}
          >
            Cancel
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Orders</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> Create Order
        </Button>
      </div>

      <DataTable
        columns={columns}
        rows={orders}
        loading={isLoading}
        emptyMessage='No orders found. Create your first order!'
      />

      {showCreateModal && (
        <OrderModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
