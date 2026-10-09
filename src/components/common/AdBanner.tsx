import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { AdPlacement, Advertisement } from '../../types';
import { db } from '../../services/db';
import { handleImageError } from '../../utils/imageFallback';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const activeAds = db.getActiveAdsByPlacement(placement, isMobile);

    if (activeAds.length > 0) {
      const selected = activeAds[0];
      setAd(selected);
      // Record view impression safely
      db.recordAdImpression(selected.id);
    } else {
      setAd(null);
    }
  }, [placement]);

  if (!ad) return null;

  // Safe URL check - only allow http:// or https://
  const isSafeUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url, window.location.origin);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleAdClick = (e: React.MouseEvent) => {
    if (!isSafeUrl(ad.destinationUrl)) {
      e.preventDefault();
      return;
    }
    db.recordAdClick(ad.id);
  };

  return (
    <div
      className={`relative w-full rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-5 overflow-hidden transition-all hover:border-slate-700/80 ${className}`}
      role="region"
      aria-label="Sponsored Advertisement"
    >
      {/* Top Disclaimer Badge */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
        <span className="uppercase tracking-wider font-semibold text-slate-400">
          Sponsored · Advertisement
        </span>
        <span className="font-medium text-slate-400">{ad.advertiserName}</span>
      </div>

      <a
        href={isSafeUrl(ad.destinationUrl) ? ad.destinationUrl : '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdClick}
        className="group flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {ad.bannerUrl && (
            <div className="h-14 w-24 sm:h-16 sm:w-32 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
              <img
                src={ad.bannerUrl}
                alt={ad.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </div>
          )}
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-1">
              {ad.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-1">
              {ad.campaignName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
          <span>Learn More</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </a>
    </div>
  );
};
