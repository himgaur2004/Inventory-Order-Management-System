import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useCustomers } from '../../hooks/useCustomers';
import { useProducts } from '../../hooks/useProducts';
import { useCreateOrder } from '../../hooks/useOrders';

export default function OrderModal({ onClose }) {
  const { data: customers = [] } = useCustomers();
  const { data: products = [] } = useProducts();
  const createOrder = useCreateOrder();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customer_id: '',
      items: [{ product_id: '', quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const watchedItems = watch('items');

  const total = watchedItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === Number(item.product_id));
    return sum + (product ? product.price * (Number(item.quantity) || 0) : 0);
  }, 0);

  const onSubmit = (data) => {
    const payload = {
      customer_id: Number(data.customer_id),
      items: data.items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      })),
    };
    createOrder.mutate(payload, { onSuccess: onClose });
  };

  return (
    <Modal title='Create New Order' onClose={onClose} size='lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

        {/* Customer selector */}
        <div>
          <label htmlFor='order-customer' className='text-sm font-medium text-gray-700'>
            Customer *
          </label>
          <select
            id='order-customer'
            {...register('customer_id', {
              required: 'Please select a customer',
              validate: (v) => v !== '' || 'Please select a customer',
            })}
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'
          >
            <option value=''>-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.customer_id && (
            <p className='mt-1 text-xs text-red-600'>{errors.customer_id.message}</p>
          )}
        </div>

        {/* Order items — driven entirely by useFieldArray */}
        <div className='space-y-3'>
          <label className='text-sm font-medium text-gray-700'>Order Items *</label>

          {fields.map((field, idx) => {
            const selProd = products.find(
              (p) => p.id === Number(watchedItems[idx]?.product_id)
            );
            return (
              <div key={field.id} className='grid grid-cols-[1fr_120px_36px] gap-2 items-start'>
                <select
                  id={`order-product-${idx}`}
                  {...register(`items.${idx}.product_id`, {
                    required: 'Select a product',
                    validate: (v) => v !== '' || 'Select a product',
                  })}
                  className='rounded-lg border border-gray-300 px-3 py-2 text-sm'
                >
                  <option value=''>-- Product --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (stock: {p.quantity})
                    </option>
                  ))}
                </select>

                <input
                  id={`order-quantity-${idx}`}
                  type='number'
                  min='1'
                  max={selProd?.quantity || 999}
                  {...register(`items.${idx}.quantity`, {
                    required: true,
                    min: { value: 1, message: 'Min 1' },
                    valueAsNumber: true,
                  })}
                  className='rounded-lg border border-gray-300 px-3 py-2 text-sm'
                  autoComplete='off'
                />

                <button
                  type='button'
                  onClick={() => fields.length > 1 && remove(idx)}
                  disabled={fields.length === 1}
                  className='p-2 text-gray-400 hover:text-red-500 disabled:opacity-30'
                  title='Remove item'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}

          {/* Per-item validation errors */}
          {errors.items && (
            <p className='text-xs text-red-600'>
              Please select a product and quantity for every row.
            </p>
          )}

          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={() => append({ product_id: '', quantity: 1 })}
          >
            <Plus size={14} /> Add Item
          </Button>
        </div>

        {/* Estimated total */}
        <div className='flex justify-between items-center rounded-lg bg-gray-50 px-4 py-3 border border-gray-200'>
          <span className='text-sm font-medium text-gray-700'>Estimated Total</span>
          <span className='text-xl font-bold text-gray-900'>${total.toFixed(2)}</span>
        </div>

        {/* Actions */}
        <div className='flex justify-end gap-3 pt-2 border-t'>
          <Button variant='secondary' type='button' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' loading={createOrder.isPending}>
            Place Order
          </Button>
        </div>
      </form>
    </Modal>
  );
}
