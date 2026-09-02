import { useLang } from '@/context/LanguageContext';
import { Home, Package, UtensilsCrossed, Store } from 'lucide-react';

export type Tab = 'home' | 'orders' | 'catering' | 'vendor';

interface Props {
  tab: Tab;
  setTab: (t: Tab) => void;
}

function BottomNav({ tab, setTab }: Props) {
  const { t } = useLang();
  const items: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'orders', label: t.navOrders, icon: Package },
    { id: 'catering', label: t.navCatering, icon: UtensilsCrossed },
    { id: 'vendor', label: t.navVendor, icon: Store },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-amber-100 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto px-2 py-2 flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1"
            >
              <div
                className={`w-11 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  active
                    ? 'bg-amber-100 text-amber-600 scale-105'
                    : 'text-slate-400 hover:text-amber-500'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  active ? 'text-amber-600' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export { BottomNav };
export default BottomNav;
