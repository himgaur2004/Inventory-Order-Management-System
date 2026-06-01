import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function OrdersBarChart({ orders }) {
  const data = orders.slice(0, 7).map(o => ({
    name: `Order ${o.id}`,
    total: Number(o.total_amount)
  }));

  return (
    <div className='bg-white rounded-xl border border-border p-5 shadow-card'>
      <h3 className='text-sm font-semibold text-gray-900 mb-4'>Recent Orders</h3>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='total' fill='#2563eb' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
