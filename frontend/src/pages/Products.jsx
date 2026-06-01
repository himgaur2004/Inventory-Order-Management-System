import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import DataTable from '../components/tables/DataTable';
import Badge from '../components/ui/Badge';
import ProductModal from '../components/forms/ProductModal';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

function getStockStatus(qty) {
  if (qty === 0) return { label: 'Out of Stock', color: 'red' };
  if (qty <= 10) return { label: 'Low Stock', color: 'orange' };
  return { label: 'In Stock', color: 'green' };
}

export default function Products() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const debouncedSearch = useDebounce(search, 300);
  const { data: products = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const columns = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'sku', label: 'SKU' },
    { key: 'price', label: 'Price', render: (row) => `$${Number(row.price).toFixed(2)}` },
    { key: 'quantity', label: 'Stock',
      render: (row) => {
        const s = getStockStatus(row.quantity);
        return <Badge label={`${row.quantity} - ${s.label}`} color={s.color} dot />;
      }
    },
    { key: 'actions', label: '',
      render: (row) => (
        <div className='flex gap-2 justify-end'>
          <Button variant='ghost' size='sm' onClick={() => { setEditingProduct(row); setShowModal(true); }}>Edit</Button>
          <Button variant='danger' size='sm' onClick={() => deleteProduct.mutate(row.id)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
        <Button onClick={() => { setEditingProduct(null); setShowModal(true); }}>
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className='relative w-full max-w-sm'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder='Search by name or SKU...'
          className='pl-9 pr-3 py-2 w-full text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent' />
      </div>

      <DataTable columns={columns} rows={filtered} loading={isLoading} emptyMessage='No products found.' />

      {showModal && (
        <ProductModal product={editingProduct} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
