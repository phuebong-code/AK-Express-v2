const DEVICE_KEY = 'akke_device_id';
const WALLET_KEY = 'akke_wallet';
const BONUS_USED_KEY = 'akke_welcome_bonus_used';
const REFERRAL_KEY = 'akke_referral_credits';

export interface WalletState {
  balance: number;
  welcomeBonusUsed: boolean;
  referralCredits: number;
}

export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function getWallet(): WalletState {
  const balance = parseInt(localStorage.getItem(WALLET_KEY) || '0', 10);
  const welcomeBonusUsed = localStorage.getItem(BONUS_USED_KEY) === 'true';
  const referralCredits = parseInt(localStorage.getItem(REFERRAL_KEY) || '0', 10);
  return { balance, welcomeBonusUsed, referralCredits };
}

export const WELCOME_BONUS_AMOUNT = 500;
export const WELCOME_BONUS_THRESHOLD = 3000;

export function applyWelcomeBonus(totalBeforeBonus: number, wallet: WalletState): { bonus: number; newTotal: number } {
  if (!wallet.welcomeBonusUsed && totalBeforeBonus >= WELCOME_BONUS_THRESHOLD) {
    const bonus = Math.min(WELCOME_BONUS_AMOUNT, totalBeforeBonus);
    const newTotal = totalBeforeBonus - bonus;
    localStorage.setItem(BONUS_USED_KEY, 'true');
    return { bonus, newTotal };
  }
  return { bonus: 0, newTotal: totalBeforeBonus };
}

export function applyWalletCredits(totalBeforeCredits: number, wallet: WalletState): { creditsUsed: number; newTotal: number; remainingBalance: number } {
  const available = wallet.balance + wallet.referralCredits;
  if (available <= 0 || totalBeforeCredits <= 0) {
    return { creditsUsed: 0, newTotal: totalBeforeCredits, remainingBalance: available };
  }
  const creditsUsed = Math.min(available, totalBeforeCredits);
  const newTotal = totalBeforeCredits - creditsUsed;
  const remainingBalance = available - creditsUsed;
  const remainingWallet = Math.max(0, wallet.balance - creditsUsed);
  const remainingReferral = Math.max(0, available - creditsUsed - remainingWallet);
  localStorage.setItem(WALLET_KEY, String(remainingWallet));
  localStorage.setItem(REFERRAL_KEY, String(remainingReferral));
  return { creditsUsed, newTotal, remainingBalance };
}

export function addReferralCredit(amount: number): void {
  const current = parseInt(localStorage.getItem(REFERRAL_KEY) || '0', 10);
  localStorage.setItem(REFERRAL_KEY, String(current + amount));
}

export function addWalletBalance(amount: number): void {
  const current = parseInt(localStorage.getItem(WALLET_KEY) || '0', 10);
  localStorage.setItem(WALLET_KEY, String(current + amount));
}
