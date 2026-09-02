import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { X, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => Promise<void>;
}

export default function PaymentModal({ open, onClose, amount, onConfirm }: Props) {
  const { t } = useLang();
  const [method, setMethod] = useState<'mtn' | 'orange'>('mtn');
  const [phase, setPhase] = useState<'select' | 'processing' | 'success'>('select');

  useEffect(() => {
    if (open) {
      setMethod('mtn');
      setPhase('select');
    }
  }, [open]);

  if (!open) return null;

  const handlePay = async () => {
    setPhase('processing');
    await new Promise((r) => setTimeout(r, 2200));
    await onConfirm();
    setPhase('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-[slideUp_0.3s_ease-out]">
        {phase !== 'success' && (
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]">{t.payWith}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {phase === 'select' && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setMethod('mtn')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  method === 'mtn'
                    ? 'border-amber-500 bg-amber-50 scale-[1.02]'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#1E293B]" />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">{t.mtnMoney}</span>
              </button>
              <button
                onClick={() => setMethod('orange')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  method === 'orange'
                    ? 'border-amber-500 bg-amber-50 scale-[1.02]'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF7900] flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#1E293B]">{t.orangeMoney}</span>
              </button>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 mb-5 text-center">
              <p className="text-xs text-amber-700 font-medium mb-1">{t.totalPayable}</p>
              <p className="text-2xl font-bold text-[#1E293B]">
                {amount.toLocaleString('en-US')} {t.xaf}
              </p>
            </div>
            <button
              onClick={handlePay}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/30"
            >
              {t.payNow}
            </button>
          </>
        )}

        {phase === 'processing' && (
          <div className="py-12 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            <p className="text-slate-600 font-medium">{t.paying}</p>
            <p className="text-sm text-slate-400">
              {method === 'mtn' ? t.mtnMoney : t.orangeMoney} • {amount.toLocaleString('en-US')} {t.xaf}
            </p>
          </div>
        )}

        {phase === 'success' && (
          <div className="py-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <p className="text-lg font-bold text-[#1E293B]">{t.paymentSuccess}</p>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors mt-2"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
