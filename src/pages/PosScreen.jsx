import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  DollarSign, 
  Coins, 
  Delete, 
  RotateCcw, 
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { formatCurrency, formatAssetAmount } from '../utils/formatters';

const PRESET_AMOUNTS = ['5.00', '10.00', '25.00', '50.00', '100.00'];

export default function PosScreen() {
  const [amount, setAmount] = useState('25.00');
  const [asset, setAsset] = useState('USDC');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePayment, setActivePayment] = useState(null);

  // Keypad actions
  const handleKeypadPress = (val) => {
    if (val === 'CLEAR') {
      setAmount('0.00');
      return;
    }
    if (val === 'BACKSPACE') {
      if (amount.length <= 1 || amount === '0.00') {
        setAmount('0.00');
      } else {
        const clean = amount.replace(/[^0-9]/g, '');
        const sliced = clean.slice(0, -1);
        const num = (parseInt(sliced || '0', 10) / 100).toFixed(2);
        setAmount(num);
      }
      return;
    }

    // Number input logic (cents based shifting)
    const clean = amount.replace(/[^0-9]/g, '') + val;
    if (clean.length > 8) return; // Prevent unreasonable numbers
    const num = (parseInt(clean, 10) / 100).toFixed(2);
    setAmount(num);
  };

  const handlePresetSelect = (preset) => {
    setAmount(preset);
  };

  const handleGeneratePayment = (e) => {
    e?.preventDefault();
    const numeric = parseFloat(amount);
    if (isNaN(numeric) || numeric <= 0) {
      alert('Please enter a valid payment amount greater than $0.00');
      return;
    }

    const newPayment = {
      paymentId: `PAY-${Date.now().toString(36).toUpperCase()}`,
      amount: amount,
      asset: asset,
      createdAt: new Date().toISOString(),
    };

    setActivePayment(newPayment);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* POS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              STELLAR <span className="text-sky-400">POS</span>
            </h1>
            <p className="text-xs text-slate-400">Instant merchant settlement on Stellar Ledger</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Active Terminal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: POS Display & Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Amount Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Charge Amount
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
              ${amount}
            </div>
            <div className="text-sm font-semibold text-sky-400 flex items-center gap-1">
              <span>Payable as:</span>
              <span className="font-mono bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                {amount} {asset}
              </span>
            </div>

            {/* Quick Presets */}
            <div className="w-full mt-6 pt-5 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2 text-left">
                Quick Select
              </span>
              <div className="grid grid-cols-5 gap-2">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                      amount === preset
                        ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30'
                        : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Asset Selector */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Select Settlement Asset
            </span>
            <div className="grid grid-cols-2 gap-3">
              {/* USDC Option */}
              <button
                type="button"
                onClick={() => setAsset('USDC')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  asset === 'USDC'
                    ? 'bg-sky-500/10 border-sky-500 text-white shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  asset === 'USDC' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  $
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>USDC</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                      Primary
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Circle USD Stablecoin</p>
                </div>
              </button>

              {/* XLM Option */}
              <button
                type="button"
                onClick={() => setAsset('XLM')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  asset === 'XLM'
                    ? 'bg-sky-500/10 border-sky-500 text-white shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  asset === 'XLM' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  *
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>XLM</span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-400 px-1.5 py-0.2 rounded font-mono">
                      Native
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Stellar Lumens</p>
                </div>
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleGeneratePayment}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-sky-600/25 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
          >
            <QrCode className="w-5 h-5" />
            <span>Generate Payment ({formatAssetAmount(amount, asset)})</span>
          </button>
        </div>

        {/* Right Column: POS Digital Keypad */}
        <div className="lg:col-span-5">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl h-full flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 px-1">
              Terminal Keypad
            </div>
            
            <div className="grid grid-cols-3 gap-3 flex-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeypadPress(digit)}
                  className="py-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-xl font-bold text-white transition-all active:scale-95 shadow-sm"
                >
                  {digit}
                </button>
              ))}
              
              <button
                type="button"
                onClick={() => handleKeypadPress('CLEAR')}
                className="py-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold text-rose-300 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>C</span>
              </button>

              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-xl font-bold text-white transition-all active:scale-95 shadow-sm"
              >
                0
              </button>

              <button
                type="button"
                onClick={() => handleKeypadPress('BACKSPACE')}
                className="py-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-300 transition-all active:scale-95 flex items-center justify-center"
                aria-label="Backspace"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-500 font-mono">
                Stellar SEP-0007 / QR URI protocol compatible
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Payment Modal Component */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentData={activePayment}
        onPaymentComplete={(completedTx) => {
          console.log('Payment completed:', completedTx);
        }}
      />
    </div>
  );
}
