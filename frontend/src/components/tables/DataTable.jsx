export default function DataTable({ columns, rows, loading, emptyMessage }) {
  if (loading) {
    return (
      <div className='border border-border rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-50 border-b'>
              {columns.map(col => (
                <th key={col.key} className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className='border-b animate-pulse'>
                {columns.map(col => (
                  <td key={col.key} className='px-4 py-3'>
                    <div className='h-4 bg-gray-200 rounded w-3/4' />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center h-48 border border-border rounded-lg bg-gray-50'>
        <p className='text-gray-500 text-sm'>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-50 border-b'>
              {columns.map(col => (
                <th key={col.key} className='px-4 py-3 text-left text-sm font-medium text-gray-700'>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className='border-b hover:bg-gray-50'>
                {columns.map(col => (
                  <td key={col.key} className='px-4 py-3 text-sm'>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
