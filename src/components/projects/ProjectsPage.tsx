import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Layers, Cpu, ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';

interface ProjectsPageProps {
  projects: ProjectItem[];
  onRequestService: (serviceName?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onRequestService,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Verified Case Studies & Implementations
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Projects & Engineering Portfolio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Real architectures deployed for corporate offices, warehouses, and software teams. Review the problems diagnosed, systems implemented, and verified operational outcomes.
        </p>
      </div>

      {/* Selected Project Full Case Study View */}
      {selectedProject ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-10 space-y-8 animate-fade-in shadow-2xl">
          <button
            onClick={() => setSelectedProject(null)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            ← Back to projects portfolio
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedProject.name}
                </h2>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1.5">
                  <div className="font-bold text-red-400">Business Challenge</div>
                  <p className="text-slate-400 leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div className="p-4 rounded-xl border border-blue-900/40 bg-blue-950/20 space-y-1.5">
                  <div className="font-bold text-blue-400">Engineering Solution</div>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              {/* Implementation steps */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Execution & Implementation
                </h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  {selectedProject.implementation.map((step, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <span className="font-mono text-blue-400 font-bold shrink-0">0{i + 1}</span>
                      <span className="text-slate-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Key Architecture */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key System Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300">
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-5">
              <div className="rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-blue-400 block">Verified Business Outcome</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedProject.result}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400 block">Technologies Deployed</span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {selectedProject.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onRequestService(selectedProject.name)}
                  className="w-full py-3 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30"
                >
                  Request Similar Implementation
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Portfolio Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="h-52 bg-slate-950 overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-0.5 rounded bg-slate-950/90 text-blue-400 border border-slate-800">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white">{proj.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {proj.overview}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-400 font-medium block mb-0.5">Outcome:</span>
                    <span>{proj.result}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-400">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>View Full Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onRequestService(proj.name)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
