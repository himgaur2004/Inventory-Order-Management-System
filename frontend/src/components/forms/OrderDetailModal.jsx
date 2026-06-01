import { X, Package, User, Calendar, Hash, DollarSign } from 'lucide-react'

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">

        <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg">
              <Hash size={18} className="text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="text-xs text-gray-500">
                <Calendar size={11} className="inline mr-1" />
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-border">
            <div className="p-2 bg-violet-50 rounded-lg">
              <User size={16} className="text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Customer</p>
              <p className="text-sm font-medium text-gray-900 truncate">{order.customer?.name}</p>
              <p className="text-xs text-gray-500 truncate">{order.customer?.email}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package size={14} className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-700">
                Items ({order.items?.length ?? 0})
              </h3>
            </div>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div
                  key={item.id ?? idx}
                  className="flex items-center justify-between p-3 bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product?.name ?? `Product #${item.product_id}`}
                    </p>
                    <p className="text-xs text-gray-500">{item.product?.sku}</p>
                  </div>
                  <div className="ml-4 text-right flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900">
                      ${Number(item.unit_price).toFixed(2)} × {item.quantity}
                    </p>
                    <p className="text-xs font-semibold text-brand-600">
                      ${(Number(item.unit_price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign size={16} />
              <span className="text-sm font-medium">Total</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              ${Number(order.total_amount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
