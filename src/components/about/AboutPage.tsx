import React from 'react';
import { ShieldCheck, Target, Compass, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../../types';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onRequestService: () => void;
  settings: SiteSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onRequestService,
  settings,
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Company Profile & Engineering Principles
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {settings.aboutTitle || 'About Techlink Assist'}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {settings.tagline || 'Smart Technology Solutions for Businesses & Professionals.'} {settings.secondaryTagline}
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Vision</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {settings.aboutVision ||
              'To provide practical, reliable and innovative technology solutions for businesses and professionals—enabling organizations to operate without unexpected downtime and empowering engineers with hands-on technical skills.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
            <Target className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {settings.aboutMission ||
              'To bridge the gap between high-level IT architecture and daily business operations. We prioritize measurable reliability, clear documentation, client ownership of all digital assets, and zero dependency on opaque black-box vendor lock-in.'}
          </p>
        </div>
      </div>

      {/* Who We Are & What We Do */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-12 space-y-6">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Who We Are</h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {settings.aboutStory ||
              'Techlink Assist is an integrated technology solutions provider. Unlike typical computer repair shops, Techlink Assist functions as a full-spectrum systems engineering partner. Our operational coverage spans corporate IT infrastructure, multi-gigabit routing with MikroTik RouterOS, automated CI/CD cloud pipelines, high-definition IP camera surveillance, and practical training through Techlink Assist Academy.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">Enterprise Focus</div>
            <p className="text-slate-400">Engineered for medium enterprises, corporate branches, and growing tech organizations.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">Complete Ownership</div>
            <p className="text-slate-400">All configurations, passwords, and source code belong permanently to you.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">Practical Academy</div>
            <p className="text-slate-400">Real lab environments training the next generation of network and DevOps engineers.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack & Toolchain */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Field-Tested Engineering Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Technologies We Deploy & Support
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
          {[
            'MikroTik RouterOS v7',
            'Windows Server 2022',
            'Active Directory & GPO',
            'Ubuntu & Debian Linux',
            'Docker & Compose',
            'Kubernetes (K8s)',
            'GitHub Actions CI/CD',
            'AWS (EC2, S3, RDS)',
            'WireGuard & IPSec',
            'Hikvision 4K AcuSense',
            'Python Automation',
            'PostgreSQL & Node.js',
          ].map((tech) => (
            <div
              key={tech}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 text-slate-200 text-center flex items-center justify-center font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">Have a specific infrastructure or networking challenge?</h3>
          <p className="text-xs sm:text-sm text-slate-400">Let’s discuss your operational needs and evaluate an optimal solution.</p>
        </div>
        <button
          onClick={onRequestService}
          className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
        >
          Consult With Our Team
        </button>
      </div>
    </div>
  );
};
