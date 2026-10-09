import React, { useState, useEffect } from 'react';
import {
  Server,
  Network,
  Cloud,
  ShieldCheck,
  Cpu,
  Globe,
  FileText,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../../types';

interface ServicesPageProps {
  services: ServiceItem[];
  selectedCategoryQuery?: string;
  onRequestService: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  selectedCategoryQuery,
  onRequestService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (selectedCategoryQuery) {
      setActiveCategory(selectedCategoryQuery);
    }
  }, [selectedCategoryQuery]);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'it-infrastructure', label: 'IT & Infrastructure' },
    { id: 'network-solutions', label: 'Network Solutions' },
    { id: 'devops-cloud', label: 'DevOps & Cloud' },
    { id: 'cctv-security', label: 'CCTV & Security' },
    { id: 'ai-automation', label: 'AI & Automation' },
    { id: 'web-solutions', label: 'Web Solutions' },
    { id: 'digital-content', label: 'Digital & Content' },
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Professional Technology Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Enterprise Services & Engineering
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From mission-critical IT infrastructure and high-throughput MikroTik routing to automated cloud pipelines and commercial security systems.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedService(null);
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Service Detail Drawer / Modal View if selected */}
      {selectedService ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 space-y-8 animate-fade-in shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="text-xs text-blue-400 font-semibold mb-1">
                {selectedService.categoryName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedService.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Back to All Services
              </button>
              <button
                onClick={() => onRequestService(selectedService.title)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 whitespace-nowrap"
              >
                <span>Request This Service</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Overview</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedService.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wide">The Challenge</div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedService.problem}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-blue-900/40 bg-blue-950/20 space-y-2">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">Our Engineering Solution</div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedService.solution}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Deliverables & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {selectedService.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Technologies & Standards</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {selectedService.technologies.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Implementation Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {selectedService.process.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-mono text-xs text-blue-400 font-bold">Phase 0{i + 1}</span>
                  <p className="text-slate-300 leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Business Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
              {selectedService.benefits.map((b, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/70">
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          {selectedService.faq && selectedService.faq.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Frequently Asked Questions</h3>
              <div className="space-y-3 text-xs sm:text-sm">
                {selectedService.faq.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="font-semibold text-white">{item.question}</div>
                    <p className="text-slate-400 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setSelectedService(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ← Back to service catalog
            </button>
            <button
              onClick={() => onRequestService(selectedService.title)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Request {selectedService.title}
            </button>
          </div>
        </div>
      ) : (
        /* Services Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:bg-slate-900 transition-all"
            >
              <div>
                <div className="text-xs text-blue-400 font-medium mb-1">
                  {srv.categoryName}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {srv.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] text-slate-400">
                  {srv.technologies.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedService(srv)}
                  className="font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onRequestService(srv.title)}
                  className="px-3 py-1.5 font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
