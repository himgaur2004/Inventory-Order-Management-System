export default function Modal({ title, onClose, size = 'md', children }) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className={`${sizes[size]} w-full mx-4 bg-white rounded-lg shadow-lg`}>
        <div className='px-6 py-4 border-b border-border flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
            ✕
          </button>
        </div>
        <div className='px-6 py-4'>{children}</div>
      </div>
    </div>
  );
}
