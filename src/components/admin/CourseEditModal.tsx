import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { CourseItem, CourseLevel, CourseMode, CourseStatus } from '../../types';

interface CourseEditModalProps {
  isOpen: boolean;
  course: CourseItem | null;
  onClose: () => void;
  onSave: (courseData: Omit<CourseItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const CourseEditModal: React.FC<CourseEditModalProps> = ({
  isOpen,
  course,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Networking');
  const [level, setLevel] = useState<CourseLevel>('Intermediate');
  const [duration, setDuration] = useState('6 Weeks');
  const [mode, setMode] = useState<CourseMode>('Hands-on Lab');
  const [price, setPrice] = useState(12000);
  const [status, setStatus] = useState<CourseStatus>('Paid');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('/images/academy_tech_lab_1791521577717.jpg');
  const [learnListText, setLearnListText] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setSlug(course.slug);
      setCategory(course.category);
      setLevel(course.level);
      setDuration(course.duration);
      setMode(course.mode);
      setPrice(course.price);
      setStatus(course.status);
      setShortDescription(course.shortDescription);
      setDescription(course.description);
      setThumbnail(course.thumbnail);
      setLearnListText(course.whatYouWillLearn.join('\n'));
      setIsPublished(course.isPublished !== false);
    } else {
      setTitle('');
      setSlug('');
      setCategory('Networking');
      setLevel('Intermediate');
      setDuration('6 Weeks');
      setMode('Hands-on Lab');
      setPrice(12000);
      setStatus('Paid');
      setShortDescription('');
      setDescription('');
      setThumbnail('/images/academy_tech_lab_1791521577717.jpg');
      setLearnListText('');
      setIsPublished(true);
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const autoSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const whatYouWillLearn = learnListText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      slug: autoSlug,
      category: category.trim(),
      level,
      duration: duration.trim(),
      mode,
      price: Math.max(0, Number(price) || 0),
      status,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      thumbnail: thumbnail.trim() || '/images/academy_tech_lab_1791521577717.jpg',
      whatYouWillLearn: whatYouWillLearn.length ? whatYouWillLearn : ['Practical skills and labs'],
      prerequisites: course?.prerequisites || ['Basic computer and networking fundamentals'],
      curriculum: course?.curriculum || [
        { moduleTitle: 'Module 1: Foundations', lessons: ['Orientation & Lab Setup'] },
        { moduleTitle: 'Module 2: Practical Implementation', lessons: ['Core Configuration & Testing'] },
      ],
      faq: course?.faq || [],
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
          {course ? 'Edit Academy Course' : 'Add New Course'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Set course curriculum details, training mode, and tuition fee in Bangladeshi Taka (BDT ৳).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Course Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MikroTik RouterOS Mastery"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. mikrotik-routeros-mastery"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Networking, Linux, Cloud"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel)}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Intermediate to Advanced">Intermediate to Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Weeks, 40 Hours"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Tuition Fee in Bangladeshi Taka (৳ BDT) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-blue-400 font-bold font-mono">৳</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded bg-slate-950 border border-slate-800 pl-8 pr-3 py-2 text-white font-mono min-h-[40px]"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as CourseMode)}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              >
                <option value="Hands-on Lab">Hands-on Lab</option>
                <option value="Online Live">Online Live</option>
                <option value="Self-Paced">Self-Paced</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Enrollment Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CourseStatus)}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              >
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Short Description *</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Summary of course outcomes..."
              className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="In-depth syllabus overview and methodology..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">What You Will Learn (One per line)</label>
            <textarea
              rows={3}
              value={learnListText}
              onChange={(e) => setLearnListText(e.target.value)}
              placeholder="Configuring RouterOS v7 firewall and NAT&#10;Deploying WireGuard tunnels&#10;Bandwidth queues"
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono text-[11px]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="coursePublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-blue-600"
            />
            <label htmlFor="coursePublished" className="text-slate-300 font-medium cursor-pointer">
              Publish Course on Techlink Academy
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
              <span>{course ? 'Save Course' : 'Add Course'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
