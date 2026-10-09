/**
 * Image Fallback Utility
 * Provides safe fallback for broken or missing images in production
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/hero_tech_infrastructure_1791521523767.jpg';

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_FALLBACK_IMAGE
) => {
  const target = e.currentTarget;
  if (target.dataset.hasFailed) return;
  target.dataset.hasFailed = 'true';
  target.src = fallbackSrc;
};
