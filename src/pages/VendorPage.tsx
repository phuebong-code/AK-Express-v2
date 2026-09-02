import { useState, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Order, CateringRequest } from '@/lib/types';
import { formatXaf } from '@/lib/pricing';
import {
  Store,
  Lock,
  Unlock,
  Loader2,
  CheckCircle2,
  XCircle,
  Wallet,
  TrendingUp,
  Utensils,
} from 'lucide-react';

export default function VendorPage() {
  const { t } = useLang();
  const [pin, setPin] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [pendingEscrow, setPendingEscrow] = useState(0);
  const [availableCashout, setAvailableCashout] = useState(0);
  const [releasedCount, setReleasedCount] = useState(0);

  const fetchBalances = useCallback(async () => {
    const [ordersRes, cateringRes, releasedOrders, releasedCatering] = await Promise.all([
      supabase.from('orders').select('cook_payout_xaf, status').eq('status', 'held_in_escrow'),
      supabase.from('catering_requests').select('cook_payout_xaf, status').eq('status', 'held_in_escrow'),
      supabase.from('orders').select('cook_payout_xaf, status').eq('status', 'released'),
      supabase.from('catering_requests').select('cook_payout_xaf, status').eq('status', 'released'),
    ]);

    const pendingOrders = (ordersRes.data as Order[] | null) || [];
    const pendingCatering = (cateringRes.data as CateringRequest[] | null) || [];
    const releasedOrdersData = (releasedOrders.data as Order[] | null) || [];
    const releasedCateringData = (releasedCatering.data as CateringRequest[] | null) || [];

    const pending = [...pendingOrders, ...pendingCatering].reduce((s, o) => s + o.cook_payout_xaf, 0);
    const available = [...releasedOrdersData, ...releasedCateringData].reduce(
      (s, o) => s + o.cook_payout_xaf,
      0,
    );

    setPendingEscrow(pending);
    setAvailableCashout(available);
    setReleasedCount(releasedOrdersData.length + releasedCateringData.length);
  }, []);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  async function verifyPin() {
    if (pin.length !== 4) return;
    setVerifying(true);
    setResult(null);

    // Try orders table first
    const { data: orderMatch } = await supabase
      .from('orders')
      .select('id, status')
      .eq('pickup_pin', pin)
      .eq('status', 'held_in_escrow')
      .maybeSingle();

    if (orderMatch) {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'released', released_at: new Date().toISOString() })
        .eq('id', (orderMatch as Order).id);
      if (!error) {
        setResult('success');
        setPin('');
        await fetchBalances();
        setVerifying(false);
        return;
      }
    }

    // Try catering table
    const { data: cateringMatch } = await supabase
      .from('catering_requests')
      .select('id, status')
      .eq('pickup_pin', pin)
      .eq('status', 'held_in_escrow')
      .maybeSingle();

    if (cateringMatch) {
      const { error } = await supabase
        .from('catering_requests')
        .update({ status: 'released', released_at: new Date().toISOString() })
        .eq('id', (cateringMatch as CateringRequest).id);
      if (!error) {
        setResult('success');
        setPin('');
        await fetchBalances();
        setVerifying(false);
        return;
      }
    }

    setResult('error');
    setVerifying(false);
  }

  return (
    <div className="px-5 pt-6 pb-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#B91C1C] flex items-center justify-center mx-auto mb-3 shadow-md">
          <Store className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-[#1E293B]">{t.vendorTitle}</h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
          {t.vendorSubtitle}
        </p>
      </div>

      {/* PIN input */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
        <label className="text-xs font-semibold text-[#1E293B] mb-2 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-500" />
          {t.enterPin}
        </label>
        <input
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
            setResult(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && verifyPin()}
          placeholder={t.enterPinPlaceholder}
          maxLength={4}
          inputMode="numeric"
          className="w-full px-4 py-4 bg-amber-50/50 rounded-xl border-2 border-amber-200 text-2xl font-extrabold text-center text-[#1E293B] tracking-[0.5em] placeholder:text-slate-300 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
        />
        <button
          onClick={verifyPin}
          disabled={pin.length !== 4 || verifying}
          className="w-full mt-3 py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
        >
          {verifying ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Unlock className="w-5 h-5" />
          )}
          {t.verifyPin}
        </button>

        {result === 'success' && (
          <div className="mt-3 bg-green-50 rounded-xl p-3 flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-600 font-semibold">{t.pinVerified}</p>
          </div>
        )}
        {result === 'error' && (
          <div className="mt-3 bg-red-50 rounded-xl p-3 flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-500 font-semibold">{t.pinInvalid}</p>
          </div>
        )}
      </div>

      {/* Balances */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-2">
            <Lock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {t.pendingEscrow}
          </p>
          <p className="text-xl font-extrabold text-[#1E293B] mt-1">
            {formatXaf(pendingEscrow)}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-2">
            <Wallet className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {t.availableCashout}
          </p>
          <p className="text-xl font-extrabold text-green-600 mt-1">
            {formatXaf(availableCashout)}
          </p>
        </div>
      </div>

      {/* Released orders */}
      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-amber-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <h3 className="text-sm font-bold text-[#1E293B]">{t.releasedOrders}</h3>
          <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {releasedCount}
          </span>
        </div>
        {releasedCount === 0 ? (
          <p className="text-xs text-slate-400 py-2">{t.noReleased}</p>
        ) : (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Utensils className="w-3.5 h-3.5" />
            <span>{releasedCount} orders fulfilled</span>
          </div>
        )}
      </div>
    </div>
  );
}
