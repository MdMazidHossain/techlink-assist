import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectEditModalProps {
  isOpen: boolean;
  project: ProjectItem | null;
  onClose: () => void;
  onSave: (projectData: Omit<ProjectItem, 'id' | 'createdAt'>) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Network Infrastructure');
  const [overview, setOverview] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [techText, setTechText] = useState('');
  const [image, setImage] = useState('/images/hero_tech_infrastructure_1791521523767.jpg');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setSlug(project.slug);
      setCategory(project.category);
      setOverview(project.overview);
      setProblem(project.problem);
      setSolution(project.solution);
      setResult(project.result);
      setTechText(project.technologies.join(', '));
      setImage(project.image);
      setGithubUrl(project.githubUrl || '');
      setLiveDemoUrl(project.liveDemoUrl || '');
      setIsPublished(project.isPublished !== false);
    } else {
      setName('');
      setSlug('');
      setCategory('Network Infrastructure');
      setOverview('');
      setProblem('');
      setSolution('');
      setResult('');
      setTechText('');
      setImage('/images/hero_tech_infrastructure_1791521523767.jpg');
      setGithubUrl('');
      setLiveDemoUrl('');
      setIsPublished(true);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const autoSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const technologies = techText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      slug: autoSlug,
      category: category.trim(),
      overview: overview.trim(),
      problem: problem.trim() || 'Business operational challenges',
      solution: solution.trim() || 'Techlink Assist engineered solution',
      result: result.trim() || 'Successful deployment with zero downtime',
      technologies: technologies.length ? technologies : ['MikroTik', 'Linux', 'Docker'],
      implementation: project?.implementation || ['Phase 1: Architecture Plan', 'Phase 2: Deployment'],
      features: project?.features || ['High Availability', 'Continuous Monitoring'],
      image: image.trim() || '/images/hero_tech_infrastructure_1791521523767.jpg',
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
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
          {project ? 'Edit Project / Case Study' : 'Add New Project'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Showcase completed technical implementations, infrastructure setups, and client results.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Enterprise Network Overhaul"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. enterprise-network-overhaul"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Network Solutions, DevOps, Cloud"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Screenshot / Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="URL to screenshot..."
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Overview *</label>
            <textarea
              required
              rows={2}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Summary of scope, users impacted, and objectives..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Problem / Challenge</label>
              <textarea
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What challenges was the client facing?"
                className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Solution Implemented</label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Architecture deployed to solve it..."
                className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Key Results & Outcomes</label>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder="e.g. 99.99% uptime achieved with 40% latency reduction"
              className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Technologies (Comma separated)</label>
            <input
              type="text"
              value={techText}
              onChange={(e) => setTechText(e.target.value)}
              placeholder="MikroTik RouterOS, WireGuard, Docker, Prometheus, Grafana"
              className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px] font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">GitHub Repository URL (Optional)</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/techlinkassist/..."
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Live Demo / Portal URL (Optional)</label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://demo.techlinkassist.com/..."
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="projectPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-blue-600"
            />
            <label htmlFor="projectPublished" className="text-slate-300 font-medium cursor-pointer">
              Publish Project on Portfolio Showcase
            </label>
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
              <span>{project ? 'Save Project' : 'Add Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
