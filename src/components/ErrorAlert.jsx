import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorAlert({ title = 'Error', message, onRetry }) {
  return (
    <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-200 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-rose-300">{title}</h4>
        <p className="text-xs text-rose-200/80 mt-0.5">{message || 'Something went wrong. Please try again.'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  );
}
