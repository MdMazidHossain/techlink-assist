/**
 * Currency Formatting Utility for Bangladeshi Taka (BDT - ৳)
 *
 * Ensures consistent BDT (৳) currency representation across all pages,
 * cards, modals, tables, and admin dashboards.
 */

export const DEFAULT_CURRENCY = 'BDT';
export const CURRENCY_SYMBOL = '৳';

/**
 * Format a numeric amount into standard Bangladeshi Taka notation.
 * Examples:
 *   500 -> ৳500
 *   1500 -> ৳1,500
 *   10000 -> ৳10,000
 *   25000 -> ৳25,000
 */
export const formatBDT = (
  amount: number,
  options?: { showDecimals?: boolean }
): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '৳0';
  }

  const rounded = options?.showDecimals ? amount : Math.round(amount);

  const formattedNumber = new Intl.NumberFormat('en-BD', {
    maximumFractionDigits: options?.showDecimals ? 2 : 0,
    minimumFractionDigits: options?.showDecimals ? 2 : 0,
  }).format(rounded);

  return `৳${formattedNumber}`;
};

export const parseBDT = (value: string | number): number => {
  if (typeof value === 'number') return Math.max(0, value);
  const clean = String(value).replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
};
