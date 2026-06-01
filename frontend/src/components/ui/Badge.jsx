export default function Badge({ label, color = 'gray', dot = false }) {
  const colors = {
    green: 'bg-green-50 text-green-700 ring-green-600/20',
    orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
    red: 'bg-red-50 text-red-700 ring-red-600/20',
    blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    gray: 'bg-gray-50 text-gray-700 ring-gray-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[color]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full bg-current`} />}
      {label}
    </span>
  );
}
