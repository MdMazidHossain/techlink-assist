import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
} from 'lucide-react';
import { CourseItem, CourseLevel } from '../../types';
import { formatBDT } from '../../utils/currency';
import { handleImageError } from '../../utils/imageFallback';

interface CoursesPageProps {
  courses: CourseItem[];
  onEnrollCourse: (course: CourseItem) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  onEnrollCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const categories = [
    'all',
    'Networking',
    'DevOps & Linux',
    'DevOps & Cloud',
    'AI & Automation',
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'all' || c.level.toLowerCase().includes(selectedLevel.toLowerCase());
    return matchesCat && matchesLevel;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Academy Hero Banner */}
      <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-12 overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <GraduationCap className="h-4 w-4" />
            <span>Techlink Assist Academy</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
            Learn Practical Technology. Build Real Skills.
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            No fluff, no multiple-choice trivia. Our curriculum is built around real CLI terminals, virtualized CHR labs, Docker environments, and production Linux servers. All course tuition in Bangladeshi Taka (৳ BDT).
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-900">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-slate-500 font-medium mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedCourse(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[38px] ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Disciplines' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Level:</span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors min-h-[36px] ${
                selectedLevel === lvl
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl === 'all' ? 'All' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Course Detail View */}
      {selectedCourse ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-10 space-y-8 animate-fade-in shadow-2xl">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 min-h-[40px]"
          >
            ← Back to academy catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
                  <span>{selectedCourse.category}</span>
                  <span>·</span>
                  <span>{selectedCourse.level}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              {/* What you will learn */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">What You Will Master</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                  {selectedCourse.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Prerequisites</h3>
                <ul className="text-xs sm:text-sm text-slate-400 list-disc list-inside space-y-1">
                  {selectedCourse.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Curriculum breakdown */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Curriculum & Lab Modules</h3>
                <div className="space-y-3 text-xs">
                  {selectedCourse.curriculum.map((mod, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="font-bold text-white text-sm">{mod.moduleTitle}</div>
                      <ul className="space-y-1 text-slate-400 pl-2">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-blue-500" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {selectedCourse.faq && selectedCourse.faq.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Frequently Asked Questions</h3>
                  {selectedCourse.faq.map((item, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="font-semibold text-white">{item.question}</div>
                      <p className="text-slate-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Course Summary Card */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-950 p-5 sm:p-6 space-y-5">
              <div className="rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="w-full h-44 object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Tuition / Registration</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {formatBDT(selectedCourse.price)}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-y border-slate-800 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-medium text-white">{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <span className="font-medium text-white">{selectedCourse.mode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Level:</span>
                  <span className="font-medium text-white">{selectedCourse.level}</span>
                </div>
                {selectedCourse.instructorRole && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Instructor:</span>
                    <span className="font-medium text-white">{selectedCourse.instructorRole}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => onEnrollCourse(selectedCourse)}
                className="w-full py-3 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 min-h-[44px]"
              >
                Enroll in This Course
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="h-44 bg-slate-950 overflow-hidden relative">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 left-3 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-950/90 text-blue-400 border border-slate-800">
                    {c.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{c.level}</span>
                    <span>{c.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1">{c.title}</h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {c.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="font-mono text-base sm:text-lg font-bold text-white">
                  {formatBDT(c.price)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCourse(c)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 rounded-lg transition-colors min-h-[38px]"
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => onEnrollCourse(c)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[38px]"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
