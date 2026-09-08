/**
 * Currency and date formatting utilities for StellarPOS
 */

export function formatCurrency(amount, currency = 'USD') {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export function formatAssetAmount(amount, assetCode = 'USDC') {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return `0.00 ${assetCode}`;
  return `${numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${assetCode}`;
}

export function truncateAddress(address, startChars = 6, endChars = 6) {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
