import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { playLaunchChime } from '@/lib/audio';
import { UtensilsCrossed } from 'lucide-react';

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    playLaunchChime();
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#B91C1C] via-[#DC2626] to-[#7F1D1D] transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-[bounce_1s_ease-in-out_infinite]">
        <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20">
          <UtensilsCrossed className="w-12 h-12 text-white" />
        </div>
      </div>
      <h1 className="text-2xl font-extrabold text-white mt-6 tracking-tight text-center animate-[fadeIn_0.5s_ease-out]">
        Achu & Kati-Kati
        <span className="block text-amber-300">Express</span>
      </h1>
      <p className="text-white/70 text-xs mt-3 font-medium animate-[fadeIn_0.8s_ease-out]">
        {t.splashTagline}
      </p>
      <div className="mt-8 flex gap-1.5 animate-[fadeIn_1s_ease-out]">
        <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
        <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
