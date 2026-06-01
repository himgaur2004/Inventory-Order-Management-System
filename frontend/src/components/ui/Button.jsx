import { Loader } from 'lucide-react';

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled, className = '', ...props
}) {
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader size='16' className='animate-spin' />}
      {children}
    </button>
  );
}
