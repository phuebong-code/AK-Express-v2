import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Vendor, CateringRequest } from '@/lib/types';
import { QUARTERS } from '@/lib/i18n';
import { CATERING_OPTIONS, computePricing, formatXaf, generatePin } from '@/lib/pricing';
import PaymentModal from '@/components/PaymentModal';
import {
  UtensilsCrossed,
  Truck,
  MessageCircle,
  CheckCircle2,
  Lock,
  Calendar,
  User,
  Phone,
  MapPin,
  Users,
} from 'lucide-react';

export default function CateringPage() {
  const { t } = useLang();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedPeople, setSelectedPeople] = useState(20);
  const [vendorId, setVendorId] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quarter, setQuarter] = useState('');
  const [landmark, setLandmark] = useState('');
  const [payOpen, setPayOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookedPin, setBookedPin] = useState('');
  const formValid = !!(vendorId && name && phone && quarter && date);

  const selectedOption = CATERING_OPTIONS.find((o) => o.people === selectedPeople)!;
  const pricing = computePricing(selectedOption.price);
  const selectedVendor = vendors.find((v) => v.id === vendorId);

  useEffect(() => {
    supabase
      .from('vendors')
      .select('*')
      .order('rating', { ascending: false })
      .then(({ data }) => {
        if (data) setVendors(data as Vendor[]);
      });
  }, []);

  async function handlePaymentConfirm() {
    if (!vendorId || !name || !phone || !quarter || !date) return;
    const pin = generatePin();
    const insert: Omit<CateringRequest, 'id' | 'created_at' | 'released_at'> = {
      vendor_id: vendorId,
      people_count: selectedPeople,
      total_xaf: pricing.total,
      commission_xaf: pricing.commission,
      cook_payout_xaf: pricing.cookPayout,
      customer_name: name,
      customer_phone: phone,
      quarter,
      landmark: landmark || null,
      delivery_date: date,
      status: 'held_in_escrow',
      pickup_pin: pin,
    };
    const { error } = await supabase.from('catering_requests').insert(insert);
    if (!error) {
      setBookedPin(pin);
      setBooked(true);
    }
  }

  function handlePayClick() {
    if (!formValid) return;
    setPayOpen(true);
  }

  function handleWhatsApp() {
    if (!selectedVendor) return;
    const msg = encodeURIComponent(
      `Hello ${selectedVendor.name}, I'd like to order catering for ${selectedPeople} people (${formatXaf(
        selectedOption.price,
      )}) on ${date}. Name: ${name}, Quarter: ${quarter}.`,
    );
    const num = selectedVendor.phone.replace(/\D/g, '');
    window.open(`https://wa.me/237${num}?text=${msg}`, '_blank');
  }

  if (booked) {
    return (
      <div className="px-5 pt-10 pb-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-[#1E293B] mb-2">{t.cateringBooked}</h2>
          <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-3">
            {t.yourPin}
          </p>
          <div className="flex items-center justify-center gap-3 mb-4">
            {bookedPin.split('').map((d, i) => (
              <span
                key={i}
                className="w-12 h-16 bg-amber-50 rounded-xl flex items-center justify-center text-3xl font-extrabold text-[#1E293B] shadow-sm border border-amber-200"
              >
                {d}
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              setBooked(false);
              setName('');
              setPhone('');
              setLandmark('');
              setDate('');
            }}
            className="text-sm text-amber-600 font-semibold hover:text-amber-700"
          >
            {t.close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#B91C1C] flex items-center justify-center mx-auto mb-3 shadow-md">
          <UtensilsCrossed className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-[#1E293B]">{t.cateringTitle}</h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
          {t.cateringSubtitle}
        </p>
      </div>

      {/* Portion selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {CATERING_OPTIONS.map((opt) => {
          const active = selectedPeople === opt.people;
          return (
            <button
              key={opt.people}
              onClick={() => setSelectedPeople(opt.people)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                active
                  ? 'border-amber-500 bg-amber-50 scale-[1.02]'
                  : 'border-amber-100 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Users className={`w-4 h-4 ${active ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${active ? 'text-amber-700' : 'text-[#1E293B]'}`}>
                  {t.people(opt.people)}
                </span>
              </div>
              <p className={`text-lg font-extrabold ${active ? 'text-amber-600' : 'text-[#1E293B]'}`}>
                {opt.price.toLocaleString('en-US')}
              </p>
              <p className="text-[10px] text-slate-400">{t.xaf}</p>
            </button>
          );
        })}
      </div>

      {/* Form */}
      <div className="space-y-4">
        <FormField label={t.selectCook} icon={UtensilsCrossed}>
          <select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">{t.chooseVendor}</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.quarter}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={t.deliveryDate} icon={Calendar}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label={t.yourName} icon={User}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </FormField>
          <FormField label={t.phone} icon={Phone}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label={t.quarter} icon={MapPin}>
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">{t.selectQuarter}</option>
              {QUARTERS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label={t.landmark} icon={MapPin}>
            <input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder={t.landmarkPlaceholder}
              className="w-full px-4 py-3 bg-white rounded-xl border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </FormField>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
        <h3 className="text-sm font-bold text-[#1E293B] mb-4">{t.orderSummary}</h3>
        <div className="space-y-2.5">
          <SummaryRow label={`${t.totalFoodPrice} (${t.people(selectedPeople)})`} value={formatXaf(pricing.total)} />
          <SummaryRow label={t.momoDeposit} value="Covered" muted />
          <div className="border-t border-amber-100 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#1E293B]">{t.totalPayable}</span>
            <span className="text-lg font-extrabold text-amber-600">{formatXaf(pricing.total)}</span>
          </div>
        </div>
        <div className="mt-4 bg-amber-50/60 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">{t.platformFee}: {formatXaf(pricing.commission)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3 text-amber-500" />
              {t.cookEarnings}: ~{formatXaf(pricing.cookPayout)}
            </span>
          </div>
          <p className="text-[10px] text-amber-600 italic pt-1">
            {t.statusEscrow}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={handlePayClick}
          disabled={!formValid}
          className="flex items-center justify-center gap-2 py-3.5 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed text-amber-700 font-bold rounded-2xl transition-colors text-sm border border-amber-200"
        >
          <Truck className="w-4 h-4" />
          {t.payMomo}
        </button>
        <button
          onClick={handleWhatsApp}
          disabled={!selectedVendor}
          className="flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed text-green-600 font-bold rounded-2xl transition-colors text-sm border-2 border-green-500"
        >
          <MessageCircle className="w-4 h-4" />
          {t.whatsappCook}
        </button>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount={pricing.total}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );

  function FormField({
    label,
    icon: Icon,
    children,
  }: {
    label: string;
    icon: typeof User;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <label className="text-xs font-semibold text-[#1E293B] px-1 mb-1.5 flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-amber-500" />
          {label}
        </label>
        {children}
      </div>
    );
  }

  function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        <span className={`text-xs font-semibold ${muted ? 'text-slate-400' : 'text-[#1E293B]'}`}>
          {value}
        </span>
      </div>
    );
  }
}
