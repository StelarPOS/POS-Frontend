import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  Radio, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency, formatAssetAmount, truncateAddress } from '../utils/formatters';
import { buildStellarPaymentUri, STELLAR_CONFIG } from '../services/stellar';

export const MODAL_STATES = {
  IDLE: 'idle',
  GENERATED: 'generated',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAILED: 'failed',
  EXPIRED: 'expired',
};

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  paymentData, 
  onPaymentComplete 
}) {
  const [modalState, setModalState] = useState(MODAL_STATES.GENERATED);
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 min expiry countdown
  const [mockTxHash, setMockTxHash] = useState('');

  const amount = paymentData?.amount || '25.00';
  const asset = paymentData?.asset || 'USDC';
  const paymentId = paymentData?.paymentId || `PAY-${Date.now().toString(36).toUpperCase()}`;
  const destination = paymentData?.destination || STELLAR_CONFIG.mockMerchantAddress;

  const paymentUri = buildStellarPaymentUri({
    destination,
    amount,
    assetCode: asset,
    assetIssuer: STELLAR_CONFIG.usdcIssuer,
    memo: paymentId,
  });

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setModalState(MODAL_STATES.WAITING);
      setSecondsRemaining(300);
      setCopied(false);
      setMockTxHash('');
    }
  }, [isOpen]);

  // Countdown timer for expired state
  useEffect(() => {
    if (!isOpen || modalState === MODAL_STATES.SUCCESS || modalState === MODAL_STATES.FAILED || modalState === MODAL_STATES.EXPIRED) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setModalState(MODAL_STATES.EXPIRED);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, modalState]);

  const handleCopyUri = () => {
    navigator.clipboard.writeText(paymentUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSuccess = () => {
    const generatedTx = `G${Array.from({ length: 55 }, () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 36)]).join('')}`;
    setMockTxHash(generatedTx);
    setModalState(MODAL_STATES.SUCCESS);
    if (onPaymentComplete) {
      onPaymentComplete({
        paymentId,
        amount,
        asset,
        status: 'Completed',
        stellarTxHash: generatedTx,
        date: new Date().toISOString(),
      });
    }
  };

  const handleSimulateFailure = () => {
    setModalState(MODAL_STATES.FAILED);
  };

  if (!isOpen) return null;

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-semibold text-slate-200">Stellar Payment Request</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Based on State */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* ================= WAITING / GENERATED STATE ================= */}
          {(modalState === MODAL_STATES.WAITING || modalState === MODAL_STATES.GENERATED) && (
            <>
              {/* Payment Amount Display */}
              <div className="mb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Total Due</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-0.5">
                  PAY {formatCurrency(amount)}
                </div>
                <div className="text-sm font-semibold text-sky-400 mt-0.5">
                  {formatAssetAmount(amount, asset)}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-4 bg-white rounded-2xl shadow-xl shadow-sky-950/40 border-4 border-slate-800/60 my-2">
                <QRCodeSVG
                  value={paymentUri}
                  size={190}
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Real-time Status Indicator */}
              <div className="mt-4 flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-sky-400" />
                  <span>Waiting for payment...</span>
                </div>
                <p className="text-[12px] text-slate-400">
                  Listening for Stellar network transaction...
                </p>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>Expires in: {formatCountdown(secondsRemaining)}</span>
                </div>
              </div>

              {/* Payment Details Accordion/Box */}
              <div className="w-full mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-left text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Merchant Vault:</span>
                  <span className="font-mono text-slate-300">{truncateAddress(destination, 6, 6)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Payment Memo:</span>
                  <span className="font-mono text-slate-300 font-semibold">{paymentId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Settlement Asset:</span>
                  <span className="font-semibold text-slate-200">{asset} (Stellar)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyUri}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'URI Copied' : 'Copy Pay URI'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/50 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Testing / Milestone Simulation Controls */}
              <div className="w-full mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Milestone Testing:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateSuccess}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
                  >
                    Simulate Pay
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleSimulateFailure}
                    className="text-rose-400 hover:text-rose-300 font-semibold hover:underline"
                  >
                    Simulate Fail
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ================= SUCCESS STATE ================= */}
          {modalState === MODAL_STATES.SUCCESS && (
            <div className="py-4 flex flex-col items-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Payment Verified</span>
              <h4 className="text-2xl font-bold text-white mt-1">✓ PAYMENT SUCCESSFUL</h4>
              
              <div className="my-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 w-full text-center">
                <span className="text-3xl font-extrabold text-white">
                  {formatCurrency(amount)}
                </span>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                  {formatAssetAmount(amount, asset)}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment ID:</span>
                    <span className="font-mono text-slate-200">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Network:</span>
                    <span className="text-slate-200 uppercase font-medium">{STELLAR_CONFIG.network}</span>
                  </div>
                  <div className="flex flex-col text-left pt-1">
                    <span className="text-slate-400">Transaction:</span>
                    <span className="font-mono text-[11px] text-sky-400 break-all bg-slate-900 p-1.5 rounded-lg mt-0.5 border border-slate-800">
                      {mockTxHash || 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Complete & Return to POS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= FAILED STATE ================= */}
          {modalState === MODAL_STATES.FAILED && (
            <div className="py-4 flex flex-col items-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-rose-500/15 border-2 border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <XCircle className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Transaction Rejected</span>
              <h4 className="text-2xl font-bold text-white mt-1">Payment Failed</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                The Stellar network payment could not be completed or was cancelled by the wallet.
              </p>

              <div className="w-full mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalState(MODAL_STATES.WAITING)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Retry Payment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-800 hover:bg-slate-800/50 text-slate-400 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ================= EXPIRED STATE ================= */}
          {modalState === MODAL_STATES.EXPIRED && (
            <div className="py-4 flex flex-col items-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Time Limit Exceeded</span>
              <h4 className="text-2xl font-bold text-white mt-1">Payment Request Expired</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                The 5-minute payment window has expired for this request. Please generate a new payment.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSecondsRemaining(300);
                  setModalState(MODAL_STATES.WAITING);
                }}
                className="w-full mt-6 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/20 transition-all"
              >
                Regenerate Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
