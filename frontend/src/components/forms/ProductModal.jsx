import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '../ui/Modal';
import FormField, { Input } from '../ui/FormField';
import Button from '../ui/Button';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';

const schema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .refine(val => val.trim().length > 0, 'Product name cannot be empty or whitespace only')
    .refine(val => val.trim().length >= 2, 'Product name must be at least 2 characters'),
  sku: z.string()
    .min(1, 'SKU is required')
    .refine(val => val.trim().length > 0, 'SKU cannot be empty or whitespace only')
    .transform(val => val.trim().toUpperCase()),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than 0'),
  quantity: z.coerce
    .number({ invalid_type_error: 'Quantity must be a number' })
    .int('Quantity must be a whole number')
    .nonnegative('Quantity cannot be negative'),
});

export default function ProductModal({ product, onClose }) {
  const isEditing = Boolean(product);
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: product || { name: '', sku: '', price: '', quantity: 0 },
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange'
  });
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const onSubmit = (data) => {
    if (isEditing) {
      updateProduct.mutate([product.id, data], { 
        onSuccess: onClose,
        onError: (error) => console.error('Update error:', error)
      });
    } else {
      createProduct.mutate(data, { 
        onSuccess: onClose,
        onError: (error) => console.error('Create error:', error)
      });
    }
  };

  return (
    <Modal title={isEditing ? 'Edit Product' : 'Add Product'} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <FormField label='Product Name' error={errors.name?.message} required htmlFor='product-name'>
          <Input 
            id='product-name'
            name='name'
            type='text'
            required
            {...register('name')} 
            placeholder='e.g. Wireless Keyboard'
            error={!!errors.name}
            autoComplete='off'
          />
        </FormField>
        <FormField label='SKU / Product Code' error={errors.sku?.message} required hint='Must be unique' htmlFor='product-sku'>
          <Input 
            id='product-sku'
            name='sku'
            type='text'
            required
            {...register('sku')} 
            placeholder='e.g. WK-001'
            error={!!errors.sku}
            autoComplete='off'
          />
        </FormField>
        <div className='grid grid-cols-2 gap-4'>
          <FormField label='Price ($)' error={errors.price?.message} required htmlFor='product-price'>
            <Input 
              id='product-price'
              name='price'
              type='number' 
              step='0.01'
              required
              {...register('price')}
              error={!!errors.price}
              autoComplete='off'
            />
          </FormField>
          <FormField label='Stock Quantity' error={errors.quantity?.message} required htmlFor='product-quantity'>
            <Input 
              id='product-quantity'
              name='quantity'
              type='number' 
              min='0'
              required
              {...register('quantity')}
              error={!!errors.quantity}
              autoComplete='off'
            />
          </FormField>
        </div>
        <div className='flex justify-end gap-3 pt-4 border-t'>
          <Button variant='secondary' type='button' onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            type='submit' 
            loading={createProduct.isPending || updateProduct.isPending || isSubmitting}
            disabled={!isValid || isSubmitting}
          >
            {isEditing ? 'Save Changes' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
