import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Shield } from 'lucide-react';
import { SiteSettings } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onRequestService: (serviceName?: string) => void;
  onOpenAssistant: () => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onRequestService,
  onOpenAssistant,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(61);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Courses', path: '/courses' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  // Measure actual header height on mount and resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Close on Escape key press and return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Click / touch outside to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full overflow-x-clip border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 lg:gap-8 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 sm:gap-2.5 text-left text-slate-100 transition-opacity hover:opacity-90 shrink min-w-0 min-h-[44px]"
          aria-label={`${settings.siteName || 'Techlink Assist'} Home`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg shadow-sm shadow-blue-500/20 shrink-0">
            {settings.logoText || 'T'}
          </div>
          <span className="font-bold tracking-tight text-sm sm:text-base lg:text-lg text-white font-sans truncate max-w-[125px] min-[370px]:max-w-[170px] sm:max-w-none">
            {settings.siteName || 'Techlink Assist'}
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links (hidden on mobile & tablet < 1024px) */}
        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                  isActive
                    ? 'border-blue-500 text-white font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: CTA & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* AI Assistant shortcut (desktop & tablet >= 640px) */}
          <button
            onClick={onOpenAssistant}
            aria-label="Open Techlink AI Assistant"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:border-blue-500/50 hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Techlink AI</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => {
              onRequestService();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm shadow-blue-600/30 whitespace-nowrap shrink-0 min-h-[44px]"
            aria-label="Request a Service"
          >
            <span className="hidden sm:inline">Request Service</span>
            <span className="inline sm:hidden">Request</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile/Tablet Hamburger Toggle Button (Screen < 1024px) */}
          <button
            ref={hamburgerButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] rounded-lg bg-slate-900 border border-slate-700/80 text-white hover:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shrink-0 shadow-sm"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white stroke-[2.2]" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-white stroke-[2.2]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop & Menu */}
      {mobileMenuOpen && (
        <div
          style={{ top: `${headerHeight}px` }}
          className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[calc(100vh-65px)] overflow-y-auto border-b border-slate-800 bg-slate-950 px-4 sm:px-6 pt-3 pb-8 shadow-2xl space-y-4"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive =
                  currentPath === link.path ||
                  (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors text-left min-h-[44px] ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white min-h-[44px]"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>Ask Techlink AI Assistant</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/admin');
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 min-h-[44px]"
              >
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                <span>Admin Management Console</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
