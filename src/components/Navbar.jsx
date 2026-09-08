import React from 'react';
import { Menu, Globe, Store, Wallet } from 'lucide-react';
import { truncateAddress } from '../utils/formatters';
import { STELLAR_CONFIG } from '../services/stellar';

export default function Navbar({ setMobileOpen }) {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Store className="w-4 h-4 text-sky-400" />
          <span className="font-medium text-slate-200 hidden sm:inline">Merchant Store #01</span>
          <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700/50 hidden md:inline">
            Standard Tier
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Stellar Network Tag */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>Network: <span className="text-sky-400 uppercase font-mono">{STELLAR_CONFIG.network}</span></span>
        </div>

        {/* Merchant Public Key Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xs:inline">Vault:</span>
          <span className="text-slate-100 font-semibold">{truncateAddress(STELLAR_CONFIG.mockMerchantAddress)}</span>
        </div>
      </div>
    </header>
  );
}
