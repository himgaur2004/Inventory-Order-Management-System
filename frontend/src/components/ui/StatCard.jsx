export default function StatCard({ icon: Icon, label, value, color, urgent }) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'bg-blue-100' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'bg-violet-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', ring: 'bg-green-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', ring: 'bg-orange-100' },
  };

  const c = colorMap[color] || colorMap.blue;
  return (
    <div className={`rounded-xl border border-border p-5 bg-white shadow-card ${urgent ? 'ring-2 ring-red-300' : ''}`}>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm text-gray-500 font-medium'>{label}</p>
          <p className='text-3xl font-bold text-gray-900 mt-1'>{value}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${c.ring}`}>
          <Icon size={20} className={c.icon} />
        </div>
      </div>
    </div>
  );
}
