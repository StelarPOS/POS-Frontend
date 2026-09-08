import React, { useState } from 'react';
import { 
  ReceiptText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Coins
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { formatCurrency, formatDate, truncateAddress } from '../utils/formatters';

// Comprehensive mock transactions dataset for milestone
const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-9025',
    paymentId: 'PAY-USDC-9025',
    amount: '25.00',
    asset: 'USDC',
    status: 'Completed',
    stellarTxHash: 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ',
    customer: 'GBLF...82LK',
    date: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'TXN-9024',
    paymentId: 'PAY-USDC-9024',
    amount: '142.50',
    asset: 'USDC',
    status: 'Completed',
    stellarTxHash: 'GD7YXZ79ZOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJD81A',
    customer: 'GCKX...99QA',
    date: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'TXN-9023',
    paymentId: 'PAY-XLM-9023',
    amount: '85.00',
    asset: 'XLM',
    status: 'Pending',
    stellarTxHash: null,
    customer: 'GB3M...20LK',
    date: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'TXN-9022',
    paymentId: 'PAY-USDC-9022',
    amount: '10.00',
    asset: 'USDC',
    status: 'Failed',
    stellarTxHash: null,
    customer: 'GDFQ...11PO',
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'TXN-9021',
    paymentId: 'PAY-USDC-9021',
    amount: '50.00',
    asset: 'USDC',
    status: 'Completed',
    stellarTxHash: 'GB6NV2IN52PXITQH7Q3K27BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7U',
    customer: 'GD4A...77XY',
    date: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'TXN-9020',
    paymentId: 'PAY-XLM-9020',
    amount: '350.00',
    asset: 'XLM',
    status: 'Completed',
    stellarTxHash: 'GC8P7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJM9',
    customer: 'GBLF...82LK',
    date: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
  },
];

export default function TransactionsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [assetFilter, setAssetFilter] = useState('ALL');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.stellarTxHash && tx.stellarTxHash.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || tx.status.toUpperCase() === statusFilter;
    const matchesAsset = assetFilter === 'ALL' || tx.asset === assetFilter;

    return matchesSearch && matchesStatus && matchesAsset;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Transaction History</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete ledger of Stellar POS customer payment requests and verifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Payment ID or Tx..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors font-mono"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs">
            {['ALL', 'COMPLETED', 'PENDING', 'FAILED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'ALL' ? 'All Status' : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Asset Filter */}
          <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs">
            {['ALL', 'USDC', 'XLM'].map((ast) => (
              <button
                key={ast}
                type="button"
                onClick={() => setAssetFilter(ast)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  assetFilter === ast
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ast}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="No transactions found"
            description="No transaction records match your active search and filter criteria."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
              setAssetFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">Transaction</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Stellar Tx Hash</th>
                  <th className="py-4 px-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono font-medium text-slate-200">{tx.paymentId}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tx.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-white text-sm">
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-950 text-sky-400 border border-slate-800">
                        {tx.asset}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400">
                      {tx.stellarTxHash ? (
                        <a
                          href={`https://stellar.expert/explorer/testnet/tx/${tx.stellarTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          <span>{truncateAddress(tx.stellarTxHash, 8, 6)}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-600 font-mono italic">Awaiting hash</span>
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
        )}
      </div>
    </div>
  );
}
