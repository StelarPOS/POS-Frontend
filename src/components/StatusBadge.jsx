import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase();

  switch (normalized) {
    case 'completed':
    case 'success':
    case 'paid':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completed
        </span>
      );
    case 'pending':
    case 'waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          Pending
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3.5 h-3.5" />
          Failed
        </span>
      );
    case 'expired':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
          <AlertCircle className="w-3.5 h-3.5" />
          Expired
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
          {status || 'Unknown'}
        </span>
      );
  }
}
