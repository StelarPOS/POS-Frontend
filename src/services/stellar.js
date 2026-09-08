/**
 * Stellar Network Configuration & Utility Helpers (SEP-0007 / QR URI Builder)
 */

export const STELLAR_CONFIG = {
  network: import.meta.env.VITE_STELLAR_NETWORK || 'testnet',
  horizonUrl: import.meta.env.VITE_STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  usdcIssuer: import.meta.env.VITE_STELLAR_USDC_ISSUER || 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
  mockMerchantAddress: 'GCH2ZDXBVRW6R7NKGZJLDDXKAZQOG5R43D7N6W77O4Q3H2R7Y3K7O46M',
};

/**
 * Builds a Stellar SEP-0007 compatible payment URI for mobile wallets / QR scanning
 */
export function buildStellarPaymentUri({ destination, amount, assetCode, assetIssuer, memo }) {
  const dest = destination || STELLAR_CONFIG.mockMerchantAddress;
  const params = new URLSearchParams();

  if (amount) params.set('amount', amount.toString());
  if (assetCode && assetCode !== 'XLM') {
    params.set('asset_code', assetCode);
    params.set('asset_issuer', assetIssuer || STELLAR_CONFIG.usdcIssuer);
  }
  if (memo) {
    params.set('memo', memo);
    params.set('memo_type', 'MEMO_TEXT');
  }

  return `web+stellar:pay?destination=${dest}&${params.toString()}`;
}
