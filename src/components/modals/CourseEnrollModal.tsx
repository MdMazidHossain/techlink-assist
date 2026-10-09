import React, { useState, useEffect } from 'react';
import { X, CheckCircle, GraduationCap } from 'lucide-react';
import { db } from '../../services/db';
import { CourseItem } from '../../types';
import { formatBDT } from '../../utils/currency';

interface CourseEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: CourseItem | null;
}

export const CourseEnrollModal: React.FC<CourseEnrollModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('Online Live');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (course) {
      setMode(course.mode || 'Online Live');
    }
  }, [course]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = db.createCourseEnrollment({
        studentName: studentName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        courseTitle: course ? course.title : 'Academy Course',
        mode,
        message: message.trim() || 'General enrollment inquiry',
      });

      setSubmittedId(created.id);
      setIsSubmitting(false);
    } catch {
      setErrorMsg('Failed to process enrollment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStudentName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmittedId(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedId ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Enrollment Registered</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Welcome to Techlink Academy, <span className="text-white font-medium">{studentName}</span>! Your seat application for{' '}
              <span className="text-blue-400 font-medium">{course?.title}</span> has been logged under reference{' '}
              <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-200">{submittedId}</span>. Our academy coordinator will email your syllabus, lab schedule, and payment link shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-medium mb-1">
                <GraduationCap className="h-4 w-4" />
                <span>Techlink Assist Academy</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Apply for Course Enrollment</h3>
              {course && (
                <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-medium text-white">{course.title}</div>
                  <div className="text-slate-400 mt-1 flex items-center gap-3">
                    <span>Level: {course.level}</span>
                    <span>·</span>
                    <span>Duration: {course.duration}</span>
                    <span>·</span>
                    <span className="text-blue-400 font-semibold">{formatBDT(course.price)}</span>
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-lg bg-red-950/40 border border-red-800 p-3 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Student Full Name <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Alex Thorne"
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone / WhatsApp <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Preferred Learning Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Online Live">Online Live (Interactive Evening Sessions)</option>
                  <option value="Hands-on Lab">Hands-on Lab (Direct Virtual Hardware Access)</option>
                  <option value="Self-Paced">Self-Paced (Curated Materials & Assignments)</option>
                  <option value="Hybrid">Hybrid (Live Mentorship + Self-Paced Labs)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Background & Learning Goals</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your current role (e.g. IT support, student) and what skills you wish to build..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2.5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Confirm Enrollment Application'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
