import Badge from '../ui/Badge';

export default function LowStockTable({ products }) {
  return (
    <div className='bg-white rounded-xl border border-border p-5 shadow-card'>
      <h3 className='text-sm font-semibold text-gray-900 mb-4'>Low Stock Items</h3>
      <div className='space-y-3 max-h-48 overflow-y-auto'>
        {products.map(p => (
          <div key={p.id} className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'>
            <div>
              <p className='text-sm font-medium text-gray-900'>{p.name}</p>
              <p className='text-xs text-gray-500'>{p.sku}</p>
            </div>
            <Badge label={`${p.quantity} left`} color={p.quantity === 0 ? 'red' : 'orange'} dot />
          </div>
        ))}
      </div>
    </div>
  );
}
