import StatCard from '../components/ui/StatCard';
import LowStockTable from '../components/charts/LowStockTable';
import OrdersBarChart from '../components/charts/OrdersBarChart';
import { Package, Users, ShoppingCart, AlertTriangle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCustomers } from '../hooks/useCustomers';
import { useOrders } from '../hooks/useOrders';

export default function Dashboard() {
  const { data: products = [] } = useProducts();
  const { data: customers = [] } = useCustomers();
  const { data: orders = [] } = useOrders();

  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 10);
  const outOfStock = products.filter(p => p.quantity === 0);

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard icon={Package} label='Total Products' value={products.length} color='blue' />
        <StatCard icon={Users} label='Total Customers' value={customers.length} color='violet' />
        <StatCard icon={ShoppingCart} label='Total Orders' value={orders.length} color='green' />
        <StatCard icon={AlertTriangle} label='Low Stock Items'
          value={lowStock.length + outOfStock.length} color='orange'
          urgent={outOfStock.length > 0} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <OrdersBarChart orders={orders} />
        <LowStockTable products={lowStock} />
      </div>
    </div>
  );
}
