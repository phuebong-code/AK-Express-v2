import { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import type { Tab } from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import OrdersPage from '@/pages/OrdersPage';
import CateringPage from '@/pages/CateringPage';
import VendorPage from '@/pages/VendorPage';
import { OrderModal } from '@/components/OrderModal';
import type { Vendor } from '@/lib/types';

function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [orderVendor, setOrderVendor] = useState<Vendor | null>(null);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col">
        <Header />
        <main className="flex-1 pb-20">
          {tab === 'home' && <HomePage onOrder={(v) => setOrderVendor(v)} />}
          {tab === 'orders' && <OrdersPage />}
          {tab === 'catering' && <CateringPage />}
          {tab === 'vendor' && <VendorPage />}
        </main>
        <BottomNav tab={tab} setTab={setTab} />
        {orderVendor && <OrderModal vendor={orderVendor} onClose={() => setOrderVendor(null)} />}
      </div>
    </LanguageProvider>
  );
}

export default App;
