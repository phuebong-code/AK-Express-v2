import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Vendor, Order, SoupChoice } from '@/lib/types';
import {
  computePricing,
  formatXaf,
  generatePin,
  BASE_DISH_PRICE,
  ACHU_SOUP_OPTIONS,
  ACHU_ADDONS,
  KATI_KATI_BASE_OPTIONS,
  KATI_KATI_ADDONS,
  getAddonPrice,
} from '@/lib/pricing';
import { QUARTERS } from '@/lib/i18n';
import PaymentModal from '@/components/PaymentModal';
import {
  X,
  Star,
  MapPin,
  Clock,
  Lock,
  CheckCircle2,
  User,
  Phone,
  Utensils,
  Minus,
  Plus,
  Soup,
  Check,
} from 'lucide-react';

interface Props {
  vendor: Vendor;
  onClose: () => void;
}

function OrderModal({ vendor, onClose }: Props) {
  const { t } = useLang();
  const isAchu = vendor.dish_type === 'achu' || vendor.dish_type === 'full_menu';
  const isKatiKati = vendor.dish_type === 'kati_kati' || vendor.dish_type === 'full_menu';
  const defaultDishType = isAchu ? 'achu' : 'kati_kati';

  const [dishType, setDishType] = useState<'achu' | 'kati_kati'>(defaultDishType);
  const [quantity, setQuantity] = useState(1);
  const [soupChoice, setSoupChoice] = useState<SoupChoice | ''>('');
  const [achuAddons, setAchuAddons] = useState<string[]>([]);
  const [katiBase, setKatiBase] = useState<string>('standard');
  const [katiAddons, setKatiAddons] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quarter, setQuarter] = useState(vendor.quarter);
  const [landmark, setLandmark] = useState('');
  const [payOpen, setPayOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderPin, setOrderPin] = useState('');

  const showDishSwitch = isAchu && isKatiKati;

  const addonPrice =
    dishType === 'achu'
      ? getAddonPrice(achuAddons, ACHU_ADDONS)
      : getAddonPrice(katiAddons, KATI_KATI_ADDONS) +
        (KATI_KATI_BASE_OPTIONS.find((o) => o.id === katiBase)?.price || 0);

  const perUnitPrice = BASE_DISH_PRICE + addonPrice;
  const total = perUnitPrice * quantity;
  const pricing = computePricing(total);

  const soupSelected = dishType === 'kati_kati' || soupChoice !== '';
  const formValid = !!(name && phone && quarter && soupSelected);

  function toggleAddon(id: string, list: string[], setter: (v: string[]) => void) {
    setter(list.includes(id) ? list.filter((a) => a !== id) : [...list, id]);
  }

  function buildDishLabel(): string {
    if (dishType === 'achu') {
      const soupLabel =
        soupChoice === 'yellow' ? t.soupYellow :
        soupChoice === 'black' ? t.soupBlack :
        soupChoice === 'mix' ? t.soupMix : '';
      return `${t.achuSpecial}${soupLabel ? ' — ' + soupLabel : ''}`;
    }
    const baseLabel = katiBase === 'extra_fufu' ? t.baseExtraFufu : t.baseStandard;
    return `${t.fufuKatiKati} — ${baseLabel}`;
  }

  function handlePayClick() {
    if (!formValid) return;
    setPayOpen(true);
  }

  async function handlePaymentConfirm() {
    if (!name || !phone || !soupSelected) return;
    const pin = generatePin();
    const insert: Omit<Order, 'id' | 'created_at' | 'released_at'> = {
      vendor_id: vendor.id,
      customer_name: name,
      customer_phone: phone,
      dish: buildDishLabel(),
      quantity,
      total_xaf: pricing.total,
      commission_xaf: pricing.commission,
      gateway_fee_xaf: pricing.gatewayFee,
      payout_fee_xaf: pricing.payoutFee,
      cook_payout_xaf: pricing.cookPayout,
      status: 'held_in_escrow',
      pickup_pin: pin,
      quarter,
      landmark: landmark || null,
    };
    const { error } = await supabase.from('orders').insert(insert);
    if (!error) {
      setOrderPin(pin);
      setSuccess(true);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#FFFDF5] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-[#1E293B] mb-1">{t.paymentSuccess}</h2>
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-3 mt-4">
              {t.yourPin}
            </p>
            <div className="flex items-center justify-center gap-3 mb-5">
              {orderPin.split('').map((d, i) => (
                <span
                  key={i}
                  className="w-12 h-16 bg-white rounded-xl flex items-center justify-center text-3xl font-extrabold text-[#1E293B] shadow-sm border border-amber-200"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {t.statusEscrow} — {t.yourPin}
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <>
            {/* Vendor header */}
            <div className="relative h-32 overflow-hidden rounded-t-3xl">
              <img
                src={vendor.image_url || ''}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <h2 className="text-lg font-bold text-white leading-tight">{vendor.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white text-[10px] font-bold">{vendor.rating.toFixed(1)}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-bold">{vendor.quarter}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-bold">{t.minPrep(vendor.prep_minutes)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Dish type switcher */}
              {showDishSwitch && (
                <div className="flex gap-2 p-1 bg-amber-50 rounded-xl border border-amber-100">
                  <button
                    onClick={() => setDishType('achu')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      dishType === 'achu' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {t.achuSpecial}
                  </button>
                  <button
                    onClick={() => setDishType('kati_kati')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      dishType === 'kati_kati' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {t.fufuKatiKati}
                  </button>
                </div>
              )}

              {/* Dish title card */}
              <div className="bg-white rounded-2xl border border-amber-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Utensils className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1E293B]">
                      {dishType === 'achu' ? t.achuSpecial : t.fufuKatiKati}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatXaf(BASE_DISH_PRICE)} {t.perPlate}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-50">
                  <span className="text-xs font-semibold text-[#1E293B]">{t.quantity}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold text-[#1E293B] w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Achu customizations */}
              {dishType === 'achu' && (
                <>
                  {/* Soup selection */}
                  <div className="bg-white rounded-2xl border border-amber-100 p-4">
                    <label className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5 mb-3">
                      <Soup className="w-3.5 h-3.5 text-amber-500" />
                      {t.soupSelection}
                    </label>
                    <div className="space-y-2">
                      {ACHU_SOUP_OPTIONS.map((opt) => {
                        const labels: Record<string, string> = {
                          yellow: t.soupYellow,
                          black: t.soupBlack,
                          mix: t.soupMix,
                        };
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSoupChoice(opt.id as SoupChoice)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                              soupChoice === opt.id
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-slate-100 hover:border-amber-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              soupChoice === opt.id ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                            }`}>
                              {soupChoice === opt.id && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-semibold text-[#1E293B]">{labels[opt.id]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Achu add-ons */}
                  <div className="bg-white rounded-2xl border border-amber-100 p-4">
                    <label className="text-xs font-bold text-[#1E293B] mb-3 block">{t.addOns}</label>
                    <div className="space-y-2">
                      {ACHU_ADDONS.map((opt) => {
                        const labels: Record<string, string> = {
                          tripe: t.addonTripe,
                          canda: t.addonCanda,
                          njakatu: t.addonNjakatu,
                          njama_njama: t.addonNjamaNjama,
                          extra_pepper: t.addonExtraPepper,
                        };
                        const checked = achuAddons.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => toggleAddon(opt.id, achuAddons, setAchuAddons)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                              checked ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-amber-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                              checked ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                            }`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-semibold text-[#1E293B] flex-1 text-left">{labels[opt.id]}</span>
                            <span className="text-xs font-bold text-amber-600">+{opt.price} {t.xaf}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Kati-Kati customizations */}
              {dishType === 'kati_kati' && (
                <>
                  {/* Base selection */}
                  <div className="bg-white rounded-2xl border border-amber-100 p-4">
                    <label className="text-xs font-bold text-[#1E293B] mb-3 block">{t.baseSelection}</label>
                    <div className="space-y-2">
                      {KATI_KATI_BASE_OPTIONS.map((opt) => {
                        const labels: Record<string, string> = {
                          standard: t.baseStandard,
                          extra_fufu: t.baseExtraFufu,
                        };
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setKatiBase(opt.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                              katiBase === opt.id
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-slate-100 hover:border-amber-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              katiBase === opt.id ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                            }`}>
                              {katiBase === opt.id && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-semibold text-[#1E293B] flex-1 text-left">{labels[opt.id]}</span>
                            {opt.price > 0 && <span className="text-xs font-bold text-amber-600">+{opt.price} {t.xaf}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Kati-Kati add-ons */}
                  <div className="bg-white rounded-2xl border border-amber-100 p-4">
                    <label className="text-xs font-bold text-[#1E293B] mb-3 block">{t.addOns}</label>
                    <div className="space-y-2">
                      {KATI_KATI_ADDONS.map((opt) => {
                        const labels: Record<string, string> = {
                          extra_chicken: t.addonExtraChicken,
                          njama_njama: t.addonNjamaNjama,
                          extra_pepper: t.addonExtraPepper,
                        };
                        const checked = katiAddons.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => toggleAddon(opt.id, katiAddons, setKatiAddons)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                              checked ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-amber-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                              checked ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                            }`}>
                              {checked && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-semibold text-[#1E293B] flex-1 text-left">{labels[opt.id]}</span>
                            <span className="text-xs font-bold text-amber-600">+{opt.price} {t.xaf}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Customer info */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#1E293B] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-500" />
                      {t.yourName}
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full px-3 py-2.5 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1E293B] mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-500" />
                      {t.phone}
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-3 py-2.5 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {t.quarter}
                  </label>
                  <select
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {QUARTERS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {t.landmark}
                  </label>
                  <input
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder={t.landmarkPlaceholder}
                    className="w-full px-3 py-2.5 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl border border-amber-100 p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{buildDishLabel()} x{quantity}</span>
                  <span className="font-semibold text-[#1E293B]">{formatXaf(total)}</span>
                </div>
                {addonPrice > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{t.addOns}</span>
                    <span className="text-slate-400">+{formatXaf(addonPrice * quantity)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">{t.momoDeposit}</span>
                  <span className="text-slate-400">Covered</span>
                </div>
                <div className="border-t border-amber-100 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1E293B]">{t.totalPayable}</span>
                  <span className="text-lg font-extrabold text-amber-600">{formatXaf(total)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-600 pt-1">
                  <Lock className="w-3 h-3" />
                  <span>{t.cookEarnings}: ~{formatXaf(pricing.cookPayout)} ({t.statusEscrow})</span>
                </div>
              </div>

              {!soupSelected && dishType === 'achu' && (
                <p className="text-xs text-orange-500 text-center font-medium">{t.selectSoup}</p>
              )}

              <button
                onClick={handlePayClick}
                disabled={!formValid}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/30"
              >
                {t.payMomo}
              </button>
            </div>
          </>
        )}

        <PaymentModal
          open={payOpen}
          onClose={() => setPayOpen(false)}
          amount={total}
          onConfirm={handlePaymentConfirm}
        />
      </div>
    </div>
  );
}

export { OrderModal };
export default OrderModal;
