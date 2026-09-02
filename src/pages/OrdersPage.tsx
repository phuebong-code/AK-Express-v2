import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Order } from '@/lib/types';
import { formatXaf } from '@/lib/pricing';
import {
  Package,
  Phone,
  Search,
  Loader2,
  Lock,
  CheckCircle2,
  Clock,
  Utensils,
  Calendar,
} from 'lucide-react';

export default function OrdersPage() {
  const { t } = useLang();
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function lookup() {
    if (!phone.trim()) {
      setOrders([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', phone.trim())
      .order('created_at', { ascending: false });
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  }

  return (
    <div className="px-5 pt-6 pb-4 max-w-md mx-auto">
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Package className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-lg font-bold text-[#1E293B]">{t.ordersTitle}</h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
          {t.ordersDesc}
        </p>
      </div>

      {/* Input */}
      <div className="mt-4 space-y-3">
        <label className="text-xs font-semibold text-[#1E293B] px-1">{t.phoneLabel}</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookup()}
            placeholder={t.phonePlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl shadow-sm border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
          />
        </div>
        <button
          onClick={lookup}
          disabled={loading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {t.viewOrdersBtn}
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
              <p className="text-slate-400 text-sm">{t.noOrders}</p>
            </div>
          ) : (
            orders.map((o) => <OrderCard key={o.id} order={o} />)
          )}
        </div>
      )}
    </div>
  );

  function OrderCard({ order }: { order: Order }) {
    const statusConfig = {
      payment_pending: { icon: Clock, label: t.statusPending, color: 'text-orange-500', bg: 'bg-orange-50' },
      held_in_escrow: { icon: Lock, label: t.statusEscrow, color: 'text-amber-600', bg: 'bg-amber-50' },
      released: { icon: CheckCircle2, label: t.statusReleased, color: 'text-green-600', bg: 'bg-green-50' },
    };
    const cfg = statusConfig[order.status];
    const StatusIcon = cfg.icon;
    const date = new Date(order.created_at).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-1.5 ${cfg.bg} px-3 py-1.5 rounded-full`}>
            <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
            <span className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</span>
          </div>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1E293B] truncate">{order.dish}</p>
            <p className="text-xs text-slate-400">x{order.quantity}</p>
          </div>
          <p className="font-extrabold text-[#1E293B]">{formatXaf(order.total_xaf)}</p>
        </div>

        {order.status === 'held_in_escrow' && order.pickup_pin && (
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 text-center border border-amber-200">
            <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
              {t.yourPin}
            </p>
            <div className="flex items-center justify-center gap-3">
              {order.pickup_pin.split('').map((d, i) => (
                <span
                  key={i}
                  className="w-11 h-14 bg-white rounded-xl flex items-center justify-center text-2xl font-extrabold text-[#1E293B] shadow-sm border border-amber-200"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-amber-600 mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t.statusEscrow}
            </p>
          </div>
        )}

        {order.status === 'released' && (
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {t.pinReleased}
            </p>
          </div>
        )}

        {order.status === 'payment_pending' && (
          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-xs text-orange-500 font-medium">{t.statusPending}</p>
          </div>
        )}
      </div>
    );
  }
}
