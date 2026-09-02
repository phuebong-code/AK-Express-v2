export const COMMISSION_RATE = 0.15;
export const GATEWAY_DEPOSIT_RATE = 0.02;
export const GATEWAY_PAYOUT_RATE = 0.01;

export interface PriceBreakdown {
  total: number;
  commission: number;
  gatewayFee: number;
  payoutFee: number;
  cookPayout: number;
}

export function computePricing(totalXaf: number): PriceBreakdown {
  const commission = Math.round(totalXaf * COMMISSION_RATE);
  const gatewayFee = Math.round(totalXaf * GATEWAY_DEPOSIT_RATE);
  const payoutFee = Math.round(totalXaf * GATEWAY_PAYOUT_RATE);
  const cookPayout = totalXaf - commission - payoutFee;
  return { total: totalXaf, commission, gatewayFee, payoutFee, cookPayout };
}

export function formatXaf(n: number): string {
  return n.toLocaleString('en-US') + ' XAF';
}

export function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export const CATERING_OPTIONS = [
  { people: 20, price: 30000 },
  { people: 40, price: 55000 },
  { people: 60, price: 80000 },
  { people: 100, price: 130000 },
];

// --- Dish customization definitions ---

export interface AddOnOption {
  id: string;
  price: number;
}

export const ACHU_SOUP_OPTIONS: { id: string; price: number }[] = [
  { id: 'yellow', price: 0 },
  { id: 'black', price: 0 },
  { id: 'mix', price: 0 },
];

export const ACHU_ADDONS: AddOnOption[] = [
  { id: 'tripe', price: 500 },
  { id: 'canda', price: 500 },
  { id: 'njakatu', price: 300 },
  { id: 'njama_njama', price: 500 },
  { id: 'extra_pepper', price: 200 },
];

export const KATI_KATI_BASE_OPTIONS: { id: string; price: number }[] = [
  { id: 'standard', price: 0 },
  { id: 'extra_fufu', price: 500 },
];

export const KATI_KATI_ADDONS: AddOnOption[] = [
  { id: 'extra_chicken', price: 1000 },
  { id: 'njama_njama', price: 500 },
  { id: 'extra_pepper', price: 200 },
];

export const BASE_DISH_PRICE = 2500;

export function getAddonPrice(addonIds: string[], options: AddOnOption[]): number {
  return addonIds.reduce((sum, id) => {
    const opt = options.find((o) => o.id === id);
    return sum + (opt?.price || 0);
  }, 0);
}
