import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/context/LanguageContext';
import { X, Smartphone, Loader2, CheckCircle2, Lock, ShieldCheck, Send } from 'lucide-react';
import { playOrderChime } from '@/lib/audio';

interface Props {
  open: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => Promise<void>;
}

export default function PaymentModal({ open, onClose, amount, onConfirm }: Props) {
  const { t } = useLang();
  const [method, setMethod] = useState<'mtn' | 'orange'>('mtn');
  const [phase, setPhase] = useState<'select' | 'pin' | 'processing' | 'success'>('select');
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [pinError, setPinError] = useState(false);
  const pinConfirmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setMethod('mtn');
      setPhase('select');
      setPin('');
      setPinConfirm('');
      setPinError(false);
    }
  }, [open]);

  if (!open) return null;

  const handlePay = () => {
    setPhase('pin');
  };

  const handlePinConfirm = async () => {
    if (pin.length !== 4) return;
    if (pin !== pinConfirm) {
      setPinError(true);
      return;
    }
    setPinError(false);
    setPhase('processing');
    await new Promise((r) => setTimeout(r, 2200));
    await onConfirm();
    playOrderChime();
    setPhase('success');
  };

  const handlePinChange = (val: string, setter: (v: string) => void) => {
    setter(val.replace(/\D/g, '').slice(0, 4));
    setPinError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-[slideUp_0.3s_ease-out] max-h-[92vh] overflow-y-auto">
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
                <span className="text-sm font-semibold text-[#1E293B] text-center leading-tight">{t.mtnMoney}</span>
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
                <span className="text-sm font-semibold text-[#1E293B] text-center leading-tight">{t.orangeMoney}</span>
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

        {phase === 'pin' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">{t.escrowPinTitle}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{t.escrowPinDesc}</p>
              </div>
            </div>

            <div className="bg-amber-50/60 rounded-xl p-3 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold text-[#1E293B]">
                {method === 'mtn' ? t.mtnMoney : t.orangeMoney}
              </span>
              <span className="ml-auto text-sm font-extrabold text-amber-600">
                {amount.toLocaleString('en-US')} {t.xaf}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1E293B] mb-2 block">{t.escrowPinTitle}</label>
                <input
                  value={pin}
                  onChange={(e) => {
                    handlePinChange(e.target.value, setPin);
                    if (e.target.value.length === 4) pinConfirmRef.current?.focus();
                  }}
                  placeholder="••••"
                  maxLength={4}
                  inputMode="numeric"
                  className="w-full px-4 py-4 bg-amber-50/50 rounded-xl border-2 border-amber-200 text-2xl font-extrabold text-center text-[#1E293B] tracking-[0.5em] placeholder:text-slate-300 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1E293B] mb-2 block">{t.confirmEscrow}</label>
                <input
                  ref={pinConfirmRef}
                  value={pinConfirm}
                  onChange={(e) => handlePinChange(e.target.value, setPinConfirm)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePinConfirm()}
                  placeholder="••••"
                  maxLength={4}
                  inputMode="numeric"
                  className={`w-full px-4 py-4 bg-amber-50/50 rounded-xl border-2 text-2xl font-extrabold text-center text-[#1E293B] tracking-[0.5em] placeholder:text-slate-300 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                    pinError ? 'border-red-400' : 'border-amber-200 focus:border-amber-400'
                  }`}
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-500 font-medium text-center animate-[fadeIn_0.2s_ease-out]">
                  {t.pinMismatch}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-amber-600 mt-4 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t.statusEscrow}</span>
            </div>

            <button
              onClick={handlePinConfirm}
              disabled={pin.length !== 4 || pinConfirm.length !== 4}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {t.confirmEscrow}
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
            <div className="flex items-center gap-1.5 text-[10px] text-amber-600 mt-2">
              <Lock className="w-3 h-3" />
              <span>{t.statusEscrow}</span>
            </div>
          </div>
        )}

        {phase === 'success' && (
          <div className="py-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <p className="text-lg font-bold text-[#1E293B]">{t.paymentSuccess}</p>
            <div className="w-full bg-blue-50 rounded-xl p-3 flex items-center gap-2 border border-blue-100 animate-[fadeIn_0.4s_ease-out]">
              <Send className="w-4 h-4 text-blue-500 shrink-0" />
              <p className="text-xs text-blue-700 font-medium text-left leading-relaxed">
                {t.dispatchNotified}
              </p>
            </div>
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
