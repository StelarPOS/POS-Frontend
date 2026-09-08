import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ReceiptText, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency, formatAssetAmount, formatDate, truncateAddress } from '../utils/formatters';

// Placeholder / mock transaction data for ~20% milestone
const MOCK_RECENT_TRANSACTIONS = [
  {
    id: 'TXN-9021',
    paymentId: 'PAY-USDC-9021',
    amount: '25.00',
    asset: 'USDC',
    status: 'Completed',
    stellarTxHash: 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ',
    date: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'TXN-9020',
    paymentId: 'PAY-XLM-9020',
    amount: '120.50',
    asset: 'XLM',
    status: 'Completed',
    stellarTxHash: 'GB6NV2IN52PXITQH7Q3K27BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7U',
    date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'TXN-9019',
    paymentId: 'PAY-USDC-9019',
    amount: '50.00',
    asset: 'USDC',
    status: 'Pending',
    stellarTxHash: null,
    date: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
  },
  {
    id: 'TXN-9018',
    paymentId: 'PAY-USDC-9018',
    amount: '15.00',
    asset: 'USDC',
    status: 'Failed',
    stellarTxHash: null,
    date: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];

export default function Dashboard() {
  const stats = [
    {
      label: 'Revenue',
      value: '$0.00',
      subtitle: 'Settled to merchant vault',
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Transactions',
      value: '0',
      subtitle: 'Total payment requests',
      icon: TrendingUp,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      label: 'Pending',
      value: '0',
      subtitle: 'Awaiting blockchain confirmation',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Successful',
      value: '0',
      subtitle: 'Completed on Stellar',
      icon: CheckCircle2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Merchant Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time overview of Stellar network payments and POS activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/pos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-600/20 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            <span>Launch POS Terminal</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl border ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 sm:px-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sample payment records from merchant terminal</p>
          </div>
          <Link
            to="/transactions"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-6">Payment ID</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Asset</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Stellar Tx</th>
                <th className="py-3.5 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {MOCK_RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-mono font-medium text-slate-200">
                    {tx.paymentId}
                  </td>
                  <td className="py-4 px-6 font-semibold text-white">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 text-sky-300 border border-slate-700">
                      {tx.asset}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="py-4 px-6 font-mono text-slate-400">
                    {tx.stellarTxHash ? (
                      <span className="text-sky-400 flex items-center gap-1">
                        {truncateAddress(tx.stellarTxHash, 6, 4)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-400">
                    {formatDate(tx.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
