import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Vendor, DishType } from '@/lib/types';
import { QUARTERS } from '@/lib/i18n';
import { getVendorImage, HERO_IMAGE } from '@/lib/images';
import { formatXaf } from '@/lib/pricing';
import {
  Search,
  Utensils,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  Flame,
  MapPin,
  ChevronRight,
  Soup,
  Drumstick,
  LayoutGrid,
} from 'lucide-react';

type CategoryFilter = 'all' | 'achu' | 'kati_kati' | 'full_menu';

interface Props {
  onOrder: (vendor: Vendor) => void;
}

export default function HomePage({ onOrder }: Props) {
  const { t } = useLang();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [quarter, setQuarter] = useState<string>('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  useEffect(() => {
    fetchVendors();
  }, [quarter]);

  async function fetchVendors() {
    setLoading(true);
    let query = supabase.from('vendors').select('*').order('rating', { ascending: false });
    if (quarter) query = query.eq('quarter', quarter);
    const { data, error } = await query;
    if (!error && data) setVendors(data as Vendor[]);
    setLoading(false);
  }

  const filtered = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === 'all' ||
      v.dish_type === category ||
      (category === 'full_menu' && v.dish_type === 'full_menu');
    return matchesSearch && matchesCategory;
  });

  const categoryTabs: { id: CategoryFilter; label: string; icon: typeof Utensils }[] = [
    { id: 'all', label: t.catAllCooks, icon: Utensils },
    { id: 'achu', label: t.catAchuSpecialists, icon: Soup },
    { id: 'kati_kati', label: t.catFufuKatiKati, icon: Drumstick },
    { id: 'full_menu', label: t.catFullMenu, icon: LayoutGrid },
  ];

  function getBadges(dt: DishType): { label: string; icon: typeof Soup }[] {
    if (dt === 'achu') return [{ label: t.servesAchu, icon: Soup }];
    if (dt === 'kati_kati') return [{ label: t.servesKatiKati, icon: Drumstick }];
    return [
      { label: t.servesAchu, icon: Soup },
      { label: t.servesKatiKati, icon: Drumstick },
    ];
  }

  return (
    <div className="pb-4">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Achu dish"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-[#FFFDF5]" />
        <div className="relative z-10 px-5 pt-8 pb-4 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold">{t.heroPill}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
            Achu & Kati-Kati
            <span className="block text-amber-400">Express</span>
          </h1>
          <p className="text-white/90 text-sm mt-2 leading-relaxed max-w-xs">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 -mt-6 relative z-10 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl shadow-lg shadow-black/5 border border-amber-100 text-sm text-[#1E293B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
          />
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="px-5 mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1 w-max">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const active = category === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                    : 'bg-white text-slate-500 border border-amber-100 hover:border-amber-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quarter chips */}
      <div className="px-5 mt-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1 w-max">
          <button
            onClick={() => setQuarter('')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              quarter === ''
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'bg-[#1E293B] text-white hover:bg-slate-700'
            }`}
          >
            {t.allQuarters}
          </button>
          {QUARTERS.map((q) => (
            <button
              key={q}
              onClick={() => setQuarter(q)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                quarter === q
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'bg-[#1E293B] text-white hover:bg-slate-700'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="px-5 mt-6">
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard icon={Utensils} title={t.featurePoundedTitle} desc={t.featurePoundedDesc} />
          <FeatureCard icon={Truck} title={t.featureFastTitle} desc={t.featureFastDesc} />
          <FeatureCard icon={ShieldCheck} title={t.featureEscrowTitle} desc={t.featureEscrowDesc} />
        </div>
      </div>

      {/* Vendors */}
      <div className="px-5 mt-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1E293B]">{t.allCooks}</h2>
          <span className="text-xs font-medium text-amber-600">
            {t.cooksCount(filtered.length)}
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-amber-100 h-36 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
            <p className="text-slate-400 text-sm">{t.noVendors}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((v) => (
              <VendorCard key={v.id} vendor={v} onOrder={() => onOrder(v)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  function FeatureCard({
    icon: Icon,
    title,
    desc,
  }: {
    icon: typeof Utensils;
    title: string;
    desc: string;
  }) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-3 flex flex-col items-center text-center gap-1.5">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-xs font-bold text-[#1E293B] leading-tight">{title}</h3>
        <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
      </div>
    );
  }

  function VendorCard({ vendor, onOrder }: { vendor: Vendor; onOrder: () => void }) {
    const badges = getBadges(vendor.dish_type);
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-32 overflow-hidden">
          <img
            src={vendor.image_url || getVendorImage(vendor.name)}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {vendor.available ? (
              <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                {t.available}
              </span>
            ) : (
              <span className="bg-slate-500/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                {t.unavailable}
              </span>
            )}
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-bold">{vendor.rating.toFixed(1)}</span>
            <span className="text-white/70 text-[10px]">({vendor.reviews})</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#1E293B] text-sm leading-tight">{vendor.name}</h3>
              <p className="text-amber-600 text-xs font-medium mt-0.5">{vendor.specialty}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-extrabold text-[#1E293B] leading-none">
                {vendor.price_xaf.toLocaleString('en-US')}
              </p>
              <p className="text-[10px] text-slate-400">{t.xaf}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
          {/* Dish badges */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {badges.map((badge, i) => {
              const BIcon = badge.icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-1 rounded-full border border-amber-100"
                >
                  <BIcon className="w-3 h-3" />
                  {badge.label}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {vendor.quarter}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {t.minPrep(vendor.prep_minutes)}
            </span>
          </div>
          <button
            onClick={onOrder}
            disabled={!vendor.available}
            className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            {t.orderNow}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
}
