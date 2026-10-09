import React from 'react';
import { Wrench, Shield, Phone, Mail } from 'lucide-react';
import { SiteSettings } from '../../types';

interface MaintenancePageProps {
  onAdminLogin: () => void;
  settings: SiteSettings;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  onAdminLogin,
  settings,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-6">
      <div className="flex justify-between items-center max-w-5xl mx-auto w-full pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            T
          </div>
          <span className="font-bold text-white tracking-tight">{settings.siteName}</span>
        </div>
        <button
          onClick={onAdminLogin}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900"
        >
          <Shield className="h-3.5 w-3.5" />
          <span>Admin Portal</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto text-center space-y-5 py-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
          <Wrench className="h-7 w-7" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Scheduled Infrastructure Maintenance
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          {settings.siteName} is currently performing scheduled system updates and platform maintenance. Normal operations will resume shortly.
        </p>

        <div className="pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 text-left">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-medium text-white flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-blue-400" />
              <span>Urgent SLA Support</span>
            </span>
            <p>{settings.phone}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-medium text-white flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              <span>Operations Desk</span>
            </span>
            <p>{settings.email}</p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 pb-4">
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </div>
    </div>
  );
};
