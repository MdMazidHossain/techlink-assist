import React from 'react';
import { Shield, ArrowUpRight, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../types';
import { AdBanner } from './AdBanner';

interface FooterProps {
  onNavigate: (path: string) => void;
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Area Advertisement Placement */}
        <AdBanner placement="footer_banner" className="mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-base">
                T
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {settings.siteName}
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              {settings.tagline}
            </p>
            <p className="text-xs text-slate-300 tracking-wide">
              {settings.secondaryTagline}
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/products')} className="hover:text-white transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/courses')} className="hover:text-white transition-colors">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors">
                  Projects & Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-white transition-colors">
                  Blog & Knowledge Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('/services?cat=it-infrastructure')} className="hover:text-white transition-colors text-left">
                  IT Support & Windows Server
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services?cat=network-solutions')} className="hover:text-white transition-colors text-left">
                  MikroTik & Enterprise Routing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services?cat=devops-cloud')} className="hover:text-white transition-colors text-left">
                  DevOps, Docker & AWS Cloud
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services?cat=cctv-security')} className="hover:text-white transition-colors text-left">
                  CCTV & IP Surveillance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services?cat=ai-automation')} className="hover:text-white transition-colors text-left">
                  AI & Process Automation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services?cat=web-solutions')} className="hover:text-white transition-colors text-left">
                  Web & Application Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Academy & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Techlink Academy
            </h4>
            <p className="text-xs text-slate-300">
              Learn Practical Technology. Build Real Skills.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('/courses')} className="hover:text-white transition-colors text-left">
                  MikroTik RouterOS v7 Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/courses')} className="hover:text-white transition-colors text-left">
                  Linux Sysadmin for DevOps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/courses')} className="hover:text-white transition-colors text-left">
                  Docker & Kubernetes Production
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/courses')} className="hover:text-white transition-colors text-left">
                  Python Network Automation
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <h5 className="text-xs font-medium text-slate-300 mb-2">Verified Channels</h5>
              <div className="flex items-center gap-3 text-xs">
                {settings.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.youtubeUrl && (
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved. Professional technology solutions and engineering.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/admin')}
              className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
            >
              <Shield className="h-3 w-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
