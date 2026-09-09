import { useState, useCallback } from 'react';
import { useLang } from '@/context/LanguageContext';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  variant?: 'icon' | 'banner';
}

function ShareButton({ variant = 'icon' }: ShareButtonProps) {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Achu & Kati-Kati Express',
      text:
        lang === 'en'
          ? 'Order authentic Bamenda-style Achu, yellow soup, and Fufu Corn & Kati-Kati delivered hot in Douala!'
          : 'Commandez l\u2019Achu authentique et Fufu Corn & Kati-Kati livr\u00e9s chauds \u00e0 Douala !',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // user cancelled — no action needed
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.title} — ${shareData.text} ${shareData.url}`,
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // clipboard failed silently
      }
    }
  }, [lang, t]);

  if (variant === 'banner') {
    return (
      <>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/30 text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t.linkCopied}
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              {t.shareApp}
            </>
          )}
        </button>
      </>
    );
  }

  return (
    <button
      onClick={handleShare}
      aria-label={t.shareApp}
      className="relative p-2 rounded-full text-amber-500 bg-amber-50 hover:bg-amber-100 transition-colors shrink-0"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {copied && (
        <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1E293B] text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out] z-50">
          {t.linkCopied}
        </span>
      )}
    </button>
  );
}

export { ShareButton };
export default ShareButton;
