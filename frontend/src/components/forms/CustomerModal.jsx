import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../ui/Modal'
import FormField, { Input } from '../ui/FormField'
import Button from '../ui/Button'
import { useCreateCustomer, useUpdateCustomer } from '../../hooks/useCustomers'

export default function CustomerModal({ customer, onClose }) {
  const isEditing = Boolean(customer)
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: { name: '', email: '', phone: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (customer) {
      reset({ name: customer.name ?? '', email: customer.email ?? '', phone: customer.phone ?? '' })
    }
  }, [customer, reset])

  const onSubmit = (data) => {
    if (isEditing) {
      updateCustomer.mutate([customer.id, data], { onSuccess: onClose })
    } else {
      createCustomer.mutate(data, { onSuccess: onClose })
    }
  }

  const isPending = createCustomer.isPending || updateCustomer.isPending

  return (
    <Modal title={isEditing ? 'Edit Customer' : 'Add Customer'} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <FormField label="Name" error={errors.name?.message} required htmlFor="customer-name">
          <Input
            id="customer-name"
            type="text"
            {...register('name', {
              required: 'Name is required',
              validate: (v) => v?.trim().length >= 2 || 'Name must be at least 2 characters',
            })}
            placeholder="John Doe"
            error={!!errors.name}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Email" error={errors.email?.message} required htmlFor="customer-email">
          <Input
            id="customer-email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="john@example.com"
            error={!!errors.email}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone?.message} htmlFor="customer-phone">
          <Input
            id="customer-phone"
            type="tel"
            {...register('phone', {
              validate: (v) => {
                if (!v) return true
                if (!/^[0-9+\-\s()]+$/.test(v)) return 'Invalid phone number'
                if (v.trim().length < 10) return 'Phone must be at least 10 digits'
                return true
              },
            })}
            placeholder="+1 (555) 000-0000"
            error={!!errors.phone}
            autoComplete="tel"
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="secondary" type="button" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isPending || isSubmitting}
            disabled={!isValid || isSubmitting || (isEditing && !isDirty)}
          >
            {isEditing ? 'Save Changes' : 'Add Customer'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
