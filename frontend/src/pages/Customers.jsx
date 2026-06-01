import { useState } from 'react';
import { Plus, Mail, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import DataTable from '../components/tables/DataTable';
import CustomerModal from '../components/forms/CustomerModal';
import { useCustomers, useDeleteCustomer } from '../hooks/useCustomers';

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const { data: customers = [], isLoading } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

  const openAdd = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  const columns = [
    {
      key: 'name', label: 'Name',
      render: (row) => (
        <span className='font-medium text-gray-900'>{row.name}</span>
      ),
    },
    {
      key: 'email', label: 'Email',
      render: (row) => (
        <div className='flex items-center gap-1.5 text-gray-600'>
          <Mail size={13} className='text-gray-400 flex-shrink-0' />
          <span className='text-sm truncate'>{row.email}</span>
        </div>
      ),
    },
    {
      key: 'phone', label: 'Phone',
      render: (row) => (
        <div className='flex items-center gap-1.5 text-gray-600'>
          {row.phone ? (
            <>
              <Phone size={13} className='text-gray-400 flex-shrink-0' />
              <span className='text-sm'>{row.phone}</span>
            </>
          ) : (
            <span className='text-gray-400 text-sm italic'>—</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions', label: '',
      render: (row) => (
        <div className='flex gap-2 justify-end'>
          <Button variant='ghost' size='sm' onClick={() => openEdit(row)}>Edit</Button>
          <Button variant='danger' size='sm' onClick={() => deleteCustomer.mutate(row.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Customers</h1>
        <Button onClick={openAdd}>
          <Plus size={16} /> Add Customer
        </Button>
      </div>

      <DataTable
        columns={columns}
        rows={customers}
        loading={isLoading}
        emptyMessage='No customers found. Add your first customer!'
      />

      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
