import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title = 'No data found', 
  description = 'There are currently no items to display.', 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
      <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-lg shadow-sky-600/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
