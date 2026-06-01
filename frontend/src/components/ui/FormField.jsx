import { AlertCircle } from 'lucide-react';
import { forwardRef } from 'react';

export default function FormField({ label, error, hint, required, children, htmlFor }) {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label htmlFor={htmlFor} className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className='text-xs text-red-600 flex items-center gap-1 mt-1'>
          <AlertCircle size={12} /> {error}
        </p>
      )}
      {!error && hint && (
        <p className='text-xs text-gray-500 mt-1'>{hint}</p>
      )}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { error, className = '', id, autoComplete, required, name, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      id={id}
      name={name || id}
      required={required}
      autoComplete={autoComplete}
      className={`block w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 hover:border-gray-400'} ${className}`}
      {...props}
    />
  );
});
