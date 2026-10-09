import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../../types';

interface ServiceEditModalProps {
  isOpen: boolean;
  service: ServiceItem | null; // null if creating
  onClose: () => void;
  onSave: (serviceData: Omit<ServiceItem, 'id'>) => void;
}

const CATEGORY_MAP: Record<ServiceCategory, string> = {
  'it-infrastructure': 'IT & Infrastructure',
  'network-solutions': 'Network Solutions',
  'devops-cloud': 'DevOps & Cloud',
  'cctv-security': 'CCTV & Security',
  'ai-automation': 'AI & Automation',
  'web-solutions': 'Web & Digital Solutions',
  'digital-content': 'Technical Content',
};

export const ServiceEditModal: React.FC<ServiceEditModalProps> = ({
  isOpen,
  service,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('it-infrastructure');
  const [shortDescription, setShortDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [techText, setTechText] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setSlug(service.slug);
      setCategory(service.category);
      setShortDescription(service.shortDescription);
      setOverview(service.overview);
      setProblem(service.problem);
      setSolution(service.solution);
      setFeaturesText(service.features.join('\n'));
      setTechText(service.technologies.join(', '));
      setIsFeatured(!!service.isFeatured);
      setIsPublished(service.isPublished !== false);
    } else {
      setTitle('');
      setSlug('');
      setCategory('it-infrastructure');
      setShortDescription('');
      setOverview('');
      setProblem('');
      setSolution('');
      setFeaturesText('');
      setTechText('');
      setIsFeatured(false);
      setIsPublished(true);
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const autoSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const technologies = techText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      slug: autoSlug,
      category,
      categoryName: CATEGORY_MAP[category],
      shortDescription: shortDescription.trim(),
      overview: overview.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      features: features.length ? features : ['Enterprise deployment & SLA guarantee'],
      technologies: technologies.length ? technologies : ['Enterprise Linux', 'MikroTik'],
      process: service?.process || ['Discovery', 'Architecture Plan', 'Implementation', 'Handover'],
      benefits: service?.benefits || ['Zero downtime', 'Full ownership'],
      faq: service?.faq || [],
      isFeatured,
      isPublished,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">
          {service ? 'Edit Service' : 'Add New Service'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Configure service details, category, features list, and publishing status.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Service Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MikroTik Enterprise Core Routing"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. mikrotik-core-routing"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              >
                <option value="it-infrastructure">IT & Infrastructure</option>
                <option value="network-solutions">Network Solutions</option>
                <option value="devops-cloud">DevOps & Cloud</option>
                <option value="cctv-security">CCTV & Security</option>
                <option value="ai-automation">AI & Automation</option>
                <option value="web-solutions">Web & Digital Solutions</option>
                <option value="digital-content">Technical Documentation</option>
              </select>
            </div>
            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Featured on Home</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Short Description *</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="One-sentence executive summary..."
              className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Detailed Overview</label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Full operational description of the service delivery..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Key Features (One per line)</label>
              <textarea
                rows={4}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="BGP & OSPF dynamic routing&#10;VLAN segmentation&#10;Bandwidth QoS management"
                className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Technologies (Comma separated)</label>
              <textarea
                rows={4}
                value={techText}
                onChange={(e) => setTechText(e.target.value)}
                placeholder="MikroTik RouterOS, Cisco IOS, WireGuard, VLAN, OSPF"
                className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-colors min-h-[40px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[40px]"
            >
              <Check className="h-4 w-4" />
              <span>{service ? 'Save Service' : 'Add Service'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
