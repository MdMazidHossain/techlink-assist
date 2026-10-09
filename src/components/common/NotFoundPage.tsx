import React from 'react';
import { ArrowLeft, ArrowRight, FileQuestion } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
        <FileQuestion className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-semibold">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or may have been moved to another location.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Home</span>
        </button>
        <button
          onClick={() => onNavigate('/services')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white transition-colors"
        >
          <span>Explore Services</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
